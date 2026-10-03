/**
 * Robust JSON & Text Parser for Mock Tests
 * Normalizes varied formats (flat questions, section-based, letters A-D, 1-based vs 0-based indices)
 */

export function parseTestJson(input) {
  let parsed;
  if (typeof input === 'string') {
    try {
      parsed = JSON.parse(input);
    } catch (e) {
      throw new Error(`Invalid JSON syntax: ${e.message}`);
    }
  } else if (typeof input === 'object' && input !== null) {
    parsed = input;
  } else {
    throw new Error("Input must be a valid JSON string or object.");
  }

  // Handle direct array of questions: [ { question, ... }, ... ]
  if (Array.isArray(parsed)) {
    parsed = {
      title: "Custom Mock Test",
      description: "Imported from question list",
      durationMinutes: Math.max(10, Math.ceil(parsed.length * 1.5)),
      markingScheme: { correct: 1, incorrect: -0.25 },
      questions: parsed
    };
  }

  const title = (parsed.title || parsed.testTitle || parsed.name || "Untitled Mock Test").trim();
  const description = parsed.description || parsed.instructions || "Please answer all questions before the timer runs out.";
  const durationMinutes = Number(parsed.durationMinutes || parsed.duration || parsed.timeInMinutes || 30);
  
  const markingScheme = {
    correct: Number(parsed.markingScheme?.correct ?? parsed.positiveMark ?? 1),
    incorrect: Number(parsed.markingScheme?.incorrect ?? parsed.negativeMark ?? 0)
  };

  let sections = [];

  if (Array.isArray(parsed.sections) && parsed.sections.length > 0) {
    sections = parsed.sections.map((sec, secIdx) => {
      const secId = sec.id || `section_${secIdx + 1}`;
      const secName = sec.name || sec.title || `Section ${secIdx + 1}`;
      const rawQuestions = Array.isArray(sec.questions) ? sec.questions : [];
      const normalizedQuestions = rawQuestions.map((q, qIdx) => normalizeQuestion(q, `${secId}_q${qIdx + 1}`, secName));
      return {
        id: secId,
        name: secName,
        questions: normalizedQuestions
      };
    });
  } else if (Array.isArray(parsed.questions)) {
    // Single section wrapping
    const normalizedQuestions = parsed.questions.map((q, qIdx) => normalizeQuestion(q, `q_${qIdx + 1}`, "General"));
    sections = [
      {
        id: "section_general",
        name: "General Questions",
        questions: normalizedQuestions
      }
    ];
  } else {
    throw new Error("Could not find any 'questions' or 'sections' array in the uploaded JSON.");
  }

  // Filter out any invalid empty sections
  sections = sections.filter(sec => sec.questions.length > 0);

  if (sections.length === 0) {
    throw new Error("The test contains 0 valid questions. Please provide questions with options.");
  }

  // Total questions count
  const totalQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0);

  return {
    id: parsed.id || `test_${Date.now()}`,
    title,
    description,
    durationMinutes: isNaN(durationMinutes) || durationMinutes <= 0 ? 30 : durationMinutes,
    markingScheme,
    sections,
    totalQuestions
  };
}

/**
 * Normalizes a question object, tolerating various schemas:
 * - options as array of strings or { id, text }
 * - correctAnswer as 0, 1, 2 or 'A', 'B', 'C', 'D' or option text string
 * - reason / explanation
 */
function normalizeQuestion(rawQ, fallbackId, sectionName) {
  if (!rawQ || typeof rawQ !== 'object') {
    throw new Error("Question item must be an object.");
  }

  const prompt = (rawQ.question || rawQ.q || rawQ.prompt || rawQ.title || "").trim();
  if (!prompt) {
    throw new Error("Found question with missing question text.");
  }

  // Options parsing
  let options = [];
  const rawOpts = rawQ.options || rawQ.choices || rawQ.answers;
  if (Array.isArray(rawOpts)) {
    options = rawOpts.map(opt => {
      if (typeof opt === 'object' && opt !== null) {
        return (opt.text || opt.label || opt.value || JSON.stringify(opt)).toString().trim();
      }
      return String(opt).trim();
    });
  } else if (typeof rawOpts === 'object' && rawOpts !== null) {
    // e.g. { "A": "...", "B": "..." }
    options = Object.values(rawOpts).map(v => String(v).trim());
  }

  if (options.length < 2) {
    throw new Error(`Question "${prompt.slice(0, 30)}..." must have at least 2 options.`);
  }

  // Determine correct answer index (0-based)
  let correctIdx = 0;
  const rawCorrect = rawQ.correctAnswer ?? rawQ.correct_answer ?? rawQ.correctOption ?? rawQ.answer ?? rawQ.key ?? rawQ.correct;

  if (typeof rawCorrect === 'number') {
    // Check if 0-based or 1-based:
    if (rawCorrect >= 0 && rawCorrect < options.length) {
      correctIdx = rawCorrect;
    } else if (rawCorrect >= 1 && rawCorrect <= options.length) {
      // User passed 1-based index (e.g. 1 for first option)
      correctIdx = rawCorrect - 1;
    }
  } else if (typeof rawCorrect === 'string') {
    const trimmed = rawCorrect.trim();
    const upper = trimmed.toUpperCase();
    const letterMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5 };
    if (upper in letterMap && letterMap[upper] < options.length) {
      correctIdx = letterMap[upper];
    } else {
      // Maybe exact text match?
      const foundIdx = options.findIndex(opt => opt.toLowerCase() === trimmed.toLowerCase());
      if (foundIdx !== -1) {
        correctIdx = foundIdx;
      } else {
        // Maybe number string "1", "2"?
        const num = parseInt(trimmed, 10);
        if (!isNaN(num)) {
          if (num >= 0 && num < options.length) correctIdx = num;
          else if (num >= 1 && num <= options.length) correctIdx = num - 1;
        }
      }
    }
  }

  const explanation = (rawQ.explanation || rawQ.reason || rawQ.solution || rawQ.rationale || "No specific explanation provided for this question.").trim();

  return {
    id: rawQ.id || fallbackId,
    question: prompt,
    options,
    correctAnswer: correctIdx,
    explanation,
    section: sectionName
  };
}

/**
 * Text-to-JSON Parser Assistant:
 * Parses formatted plain text / markdown questions into the standard mock test schema
 * Supports patterns like:
 * Q1: What is ...?
 * A) Option 1
 * B) Option 2
 * Answer: B
 * Explanation: ...
 */
export function parsePlainTextToTest(rawText, title = "Imported Text Mock Test") {
  if (!rawText || !rawText.trim()) {
    throw new Error("Text content is empty.");
  }

  const blocks = rawText.split(/\n\s*(?:(?:Q|Question|QUESTION)\s*\d+[:.]|\d+[\.)])\s*/i);
  const questions = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;

    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 3) continue;

    let questionLines = [];
    let options = [];
    let answerLetter = null;
    let explanationLines = [];
    let mode = 'question';

    for (const line of lines) {
      const optMatch = line.match(/^([A-Da-d])[\)\.]\s*(.*)$/);
      const ansMatch = line.match(/^(?:Answer|Ans|Correct|Key)[:\s]+([A-Da-d0-9])/i);
      const expMatch = line.match(/^(?:Explanation|Reason|Solution)[:\s]+(.*)$/i);

      if (ansMatch) {
        mode = 'answer';
        answerLetter = ansMatch[1].toUpperCase();
      } else if (expMatch) {
        mode = 'explanation';
        explanationLines.push(expMatch[1]);
      } else if (optMatch) {
        mode = 'option';
        options.push(optMatch[2].trim());
      } else {
        if (mode === 'question') {
          questionLines.push(line);
        } else if (mode === 'explanation') {
          explanationLines.push(line);
        } else if (mode === 'option' && options.length > 0) {
          options[options.length - 1] += " " + line;
        }
      }
    }

    if (questionLines.length > 0 && options.length >= 2) {
      let correctIdx = 0;
      if (answerLetter) {
        const letterMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
        if (letterMap[answerLetter] !== undefined) {
          correctIdx = letterMap[answerLetter];
        }
      }

      questions.push({
        id: `q_${questions.length + 1}`,
        question: questionLines.join('\n'),
        options,
        correctAnswer: correctIdx,
        explanation: explanationLines.join(' ').trim() || "Explanation derived from text."
      });
    }
  }

  if (questions.length === 0) {
    throw new Error("Could not detect any questions matching 'Q1: ... A) ... B) ... Answer: ...' pattern.");
  }

  return {
    title,
    description: "Imported via Quick Text Parser",
    durationMinutes: Math.max(10, Math.ceil(questions.length * 1.5)),
    markingScheme: { correct: 1, incorrect: -0.25 },
    sections: [
      {
        id: "section_parsed",
        name: "General Questions",
        questions
      }
    ],
    totalQuestions: questions.length
  };
}
