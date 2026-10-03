/**
 * Main Application Controller
 * Orchestrates test loading, lifecycle events, keyboard shortcuts, and exam state
 */

import { SAMPLE_TESTS, SAMPLE_TEMPLATE_JSON } from './data.js';
import { parseTestJson, parsePlainTextToTest } from './parser.js';
import { examState, QUESTION_STATUS } from './state.js';
import { ExamTimer } from './timer.js';
import { UI } from './ui.js';

class MockExamApp {
  constructor() {
    this.selectedTest = null;
    this.timer = null;
    this.currentReviewFilter = 'all';
    this.latestResults = null;
  }

  init() {
    this.setupTimer();
    this.renderSampleTests();
    this.bindGlobalEvents();
    this.bindExamControls();
    this.bindModals();
    this.bindFileUploads();
    this.bindKeyboardShortcuts();

    // Default select first sample test
    if (SAMPLE_TESTS.length > 0) {
      this.selectTest(SAMPLE_TESTS[0]);
    }

    UI.showView('view-setup');
  }

  setupTimer() {
    this.timer = new ExamTimer({
      onTick: (formattedTime, remainingSecs, status) => {
        const clockEl = document.getElementById('examTimerClock');
        const cardEl = document.getElementById('examTimerCard');
        if (clockEl) clockEl.textContent = formattedTime;
        if (cardEl) {
          cardEl.className = `exam-timer-card status-${status}`;
        }
        examState.timeRemainingSeconds = remainingSecs;
      },
      onWarning: (msg) => {
        UI.showToast(msg, 'warning', 5000);
      },
      onExpire: () => {
        UI.showToast("Time's up! Submitting your exam automatically...", 'error', 4000);
        this.submitExam(true);
      }
    });
  }

  renderSampleTests() {
    const listEl = document.getElementById('sampleTestsList');
    if (!listEl) return;

    listEl.innerHTML = SAMPLE_TESTS.map((test, idx) => {
      const totalQ = test.sections.reduce((acc, s) => acc + s.questions.length, 0);
      const isSelected = this.selectedTest && this.selectedTest.id === test.id;
      return `
        <div class="sample-test-item ${isSelected ? 'selected' : ''}" data-test-id="${test.id}">
          <div class="sample-test-head">
            <span class="sample-test-title">${test.title}</span>
            <span class="badge badge-primary">${test.durationMinutes} Mins</span>
          </div>
          <div class="sample-test-desc">${test.description}</div>
          <div class="sample-test-meta">
            <span>📝 ${totalQ} Questions</span>
            <span>📑 ${test.sections.length} Sections</span>
            <span>⚖ Marking: +${test.markingScheme.correct} / ${test.markingScheme.incorrect}</span>
          </div>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.sample-test-item').forEach(item => {
      item.addEventListener('click', () => {
        const testId = item.getAttribute('data-test-id');
        const found = SAMPLE_TESTS.find(t => t.id === testId);
        if (found) {
          this.selectTest(found);
        }
      });
    });
  }

  selectTest(testData) {
    this.selectedTest = testData;
    this.renderSampleTests();

    // Update Setup overview card
    const titleEl = document.getElementById('selectedTestTitle');
    const descEl = document.getElementById('selectedTestDesc');
    const metaEl = document.getElementById('selectedTestMeta');

    const totalQ = testData.sections ? testData.sections.reduce((acc, s) => acc + s.questions.length, 0) : (testData.totalQuestions || 0);

    if (titleEl) titleEl.textContent = testData.title;
    if (descEl) descEl.textContent = testData.description;
    if (metaEl) {
      metaEl.innerHTML = `
        <span class="badge badge-secondary">⏱ ${testData.durationMinutes} Minutes</span>
        <span class="badge badge-secondary">❓ ${totalQ} Total Questions</span>
        <span class="badge badge-secondary">✨ Marking: +${testData.markingScheme.correct} / ${testData.markingScheme.incorrect}</span>
      `;
    }
  }

  startTest() {
    if (!this.selectedTest) {
      UI.showToast("Please select or upload a mock test first.", "warning");
      return;
    }

    const candidateNameInput = document.getElementById('inputCandidateName');
    const name = candidateNameInput && candidateNameInput.value.trim() ? candidateNameInput.value.trim() : "Candidate #2026";

    // Initialize state
    examState.initTest(this.selectedTest, name);

    // Setup Header UI
    const titleEl = document.getElementById('examHeaderTitle');
    const candEl = document.getElementById('examCandidateName');
    const avatarEl = document.getElementById('examCandidateAvatar');
    if (titleEl) titleEl.textContent = this.selectedTest.title;
    if (candEl) candEl.textContent = name;
    if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();

    // Render section tabs
    const currentQ = examState.getCurrentQuestion();
    UI.renderSectionsBar(this.selectedTest.sections, currentQ ? currentQ.sectionId : null, (secId) => {
      // Jump to first question in section
      const targetIndex = examState.flattenedQuestions.findIndex(q => q.sectionId === secId);
      if (targetIndex !== -1) {
        examState.jumpToQuestion(targetIndex);
        this.syncExamView();
      }
    });

    // Start countdown timer
    this.timer.start(examState.totalDurationSeconds);

    // Show Exam View
    UI.showView('view-exam');
    this.syncExamView();
    UI.showToast("Mock test started! Good luck.", "info");
  }

  syncExamView() {
    const currentQ = examState.getCurrentQuestion();
    if (!currentQ) return;

    const userAns = examState.userAnswers[currentQ.id];
    UI.renderQuestion(
      currentQ,
      userAns,
      this.selectedTest.markingScheme,
      examState.currentQuestionIndex,
      examState.flattenedQuestions.length
    );

    // Render section tabs active state
    UI.renderSectionsBar(this.selectedTest.sections, currentQ.sectionId, (secId) => {
      const targetIdx = examState.flattenedQuestions.findIndex(q => q.sectionId === secId);
      if (targetIdx !== -1) {
        examState.jumpToQuestion(targetIdx);
        this.syncExamView();
      }
    });

    // Render Question Palette
    UI.renderPalette(
      examState.flattenedQuestions,
      examState.currentQuestionIndex,
      examState.questionStatuses,
      (targetIndex) => {
        examState.jumpToQuestion(targetIndex);
        this.syncExamView();
      }
    );

    // Bind option click listeners in question display area
    const optionsContainer = document.getElementById('optionsListContainer');
    if (optionsContainer) {
      optionsContainer.querySelectorAll('.option-item').forEach(item => {
        item.addEventListener('click', () => {
          const optIdx = parseInt(item.getAttribute('data-option-index'), 10);
          examState.selectOption(optIdx);
          this.syncExamView();
        });
      });
    }
  }

  bindExamControls() {
    // Save & Next
    document.getElementById('btnSaveNext')?.addEventListener('click', () => {
      const moved = examState.saveAndNext();
      if (!moved) {
        // Was on last question -> trigger submit prompt
        this.promptSubmitModal();
      } else {
        this.syncExamView();
      }
    });

    // Mark for Review & Next
    document.getElementById('btnMarkReview')?.addEventListener('click', () => {
      const moved = examState.markForReviewAndNext();
      if (!moved) {
        this.promptSubmitModal();
      } else {
        this.syncExamView();
      }
    });

    // Clear Response
    document.getElementById('btnClearResponse')?.addEventListener('click', () => {
      examState.clearResponse();
      this.syncExamView();
      UI.showToast("Response cleared", "info", 1500);
    });

    // Previous Question
    document.getElementById('btnPrevQuestion')?.addEventListener('click', () => {
      if (examState.previous()) {
        this.syncExamView();
      }
    });

    // Submit Exam Header Button
    document.getElementById('btnHeaderSubmit')?.addEventListener('click', () => {
      this.promptSubmitModal();
    });

    // Submit Confirmation Dialog action
    document.getElementById('btnConfirmSubmit')?.addEventListener('click', () => {
      UI.closeModal('submitConfirmModal');
      this.submitExam(false);
    });
  }

  promptSubmitModal() {
    const summary = examState.getPaletteSummary();
    UI.renderSubmitModal(summary);
    UI.openModal('submitConfirmModal');
  }

  submitExam(isAutoExpiry = false) {
    this.timer.stop();
    const results = examState.calculateResults();
    this.latestResults = results;

    UI.renderResults(results);
    UI.showView('view-results');

    if (isAutoExpiry) {
      UI.showToast("Test time completed! Results calculated.", "warning");
    } else {
      UI.showToast("Exam submitted successfully!", "success");
    }
  }

  bindGlobalEvents() {
    // Start Test CTA on Setup View
    document.getElementById('btnStartExam')?.addEventListener('click', () => {
      this.startTest();
    });

    // Retake Test Button
    document.getElementById('btnRetakeTest')?.addEventListener('click', () => {
      this.startTest();
    });

    // Back to Home Button
    document.getElementById('btnBackToHome')?.addEventListener('click', () => {
      this.timer.stop();
      UI.showView('view-setup');
    });

    // Filter Buttons in Results View
    document.querySelectorAll('.review-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.review-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        this.currentReviewFilter = filter;
        if (this.latestResults) {
          UI.renderReviewQuestions(this.latestResults.questionOutcomes, filter);
        }
      });
    });

    // Export Result as JSON
    document.getElementById('btnExportResults')?.addEventListener('click', () => {
      if (!this.latestResults) return;
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.latestResults, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `exam_result_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      UI.showToast("Result summary downloaded.", "success");
    });
  }

  bindModals() {
    // Instructions Modal
    document.getElementById('btnHeaderInstructions')?.addEventListener('click', () => {
      UI.openModal('instructionsModal');
    });
    document.getElementById('btnCloseInstructions')?.addEventListener('click', () => {
      UI.closeModal('instructionsModal');
    });

    // Question Paper Modal
    document.getElementById('btnHeaderQuestionPaper')?.addEventListener('click', () => {
      UI.renderQuestionPaperModal(examState.flattenedQuestions, (targetIdx) => {
        examState.jumpToQuestion(targetIdx);
        this.syncExamView();
      });
      UI.openModal('questionPaperModal');
    });
    document.getElementById('btnCloseQuestionPaper')?.addEventListener('click', () => {
      UI.closeModal('questionPaperModal');
    });

    // Submit Modal Close
    document.getElementById('btnCloseSubmitModal')?.addEventListener('click', () => {
      UI.closeModal('submitConfirmModal');
    });
    document.getElementById('btnCancelSubmit')?.addEventListener('click', () => {
      UI.closeModal('submitConfirmModal');
    });

    // JSON Editor Modal
    document.getElementById('btnOpenJsonEditor')?.addEventListener('click', () => {
      const editorArea = document.getElementById('jsonEditorTextarea');
      if (editorArea && this.selectedTest) {
        editorArea.value = JSON.stringify(this.selectedTest, null, 2);
      }
      UI.openModal('jsonEditorModal');
    });
    document.getElementById('btnCloseJsonEditor')?.addEventListener('click', () => {
      UI.closeModal('jsonEditorModal');
    });

    // Validate & Load JSON from editor
    document.getElementById('btnApplyJsonEditor')?.addEventListener('click', () => {
      const editorArea = document.getElementById('jsonEditorTextarea');
      if (!editorArea) return;
      try {
        const parsed = parseTestJson(editorArea.value);
        this.selectTest(parsed);
        UI.closeModal('jsonEditorModal');
        UI.showToast(`Test "${parsed.title}" loaded successfully! (${parsed.totalQuestions} questions)`, 'success');
      } catch (err) {
        UI.showToast(`Error in JSON: ${err.message}`, 'error', 6000);
      }
    });

    // Download Sample Template JSON
    document.getElementById('btnDownloadTemplate')?.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(SAMPLE_TEMPLATE_JSON, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "mock_test_template.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      UI.showToast("Template downloaded.", "success");
    });

    // Text Parser Assistant Modal
    document.getElementById('btnOpenTextParser')?.addEventListener('click', () => {
      UI.openModal('textParserModal');
    });
    document.getElementById('btnCloseTextParser')?.addEventListener('click', () => {
      UI.closeModal('textParserModal');
    });

    document.getElementById('btnParseTextToTest')?.addEventListener('click', () => {
      const textarea = document.getElementById('textParserInput');
      const titleInput = document.getElementById('textParserTitle');
      if (!textarea) return;

      try {
        const parsed = parsePlainTextToTest(textarea.value, titleInput ? titleInput.value.trim() : undefined);
        this.selectTest(parsed);
        UI.closeModal('textParserModal');
        UI.showToast(`Parsed ${parsed.totalQuestions} questions from text successfully!`, 'success');
      } catch (err) {
        UI.showToast(`Parsing error: ${err.message}`, 'error', 5000);
      }
    });
  }

  bindFileUploads() {
    const fileInput = document.getElementById('testFileInput');
    const dropzone = document.getElementById('fileDropzone');

    const handleFile = (file) => {
      if (!file) return;
      if (!file.name.endsWith('.json')) {
        UI.showToast("Please upload a .json file.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = parseTestJson(e.target.result);
          this.selectTest(parsed);
          UI.showToast(`Imported "${parsed.title}" with ${parsed.totalQuestions} questions!`, "success");
        } catch (err) {
          UI.showToast(`Upload failed: ${err.message}`, "error", 6000);
        }
      };
      reader.readAsText(file);
    };

    fileInput?.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    });

    if (dropzone) {
      dropzone.addEventListener('click', (e) => {
        // Prevent clicking button inside from double-triggering
        if (e.target.tagName !== 'BUTTON') {
          fileInput?.click();
        }
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropzone.classList.add('dragover');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropzone.classList.remove('dragover');
        });
      });

      dropzone.addEventListener('drop', (e) => {
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFile(e.dataTransfer.files[0]);
        }
      });
    }
  }

  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Only active during exam view and when not typing inside input/textarea
      const examView = document.getElementById('view-exam');
      if (!examView || !examView.classList.contains('active')) return;
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      const currentQ = examState.getCurrentQuestion();
      if (!currentQ) return;

      // Keys 1, 2, 3, 4 for options A, B, C, D
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < currentQ.options.length) {
          examState.selectOption(idx);
          this.syncExamView();
        }
      }

      // Keys a, b, c, d (case insensitive)
      const keyUpper = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(keyUpper)) {
        const letterMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
        const idx = letterMap[keyUpper];
        if (idx < currentQ.options.length) {
          examState.selectOption(idx);
          this.syncExamView();
        }
      }

      // ArrowRight or 'N' for Save & Next
      if (e.key === 'ArrowRight' || keyUpper === 'N') {
        const moved = examState.saveAndNext();
        if (moved) this.syncExamView();
      }

      // ArrowLeft or 'P' for Previous
      if (e.key === 'ArrowLeft' || keyUpper === 'P') {
        if (examState.previous()) this.syncExamView();
      }

      // 'M' for Mark for Review
      if (keyUpper === 'M') {
        const moved = examState.markForReviewAndNext();
        if (moved) this.syncExamView();
      }

      // 'C' for Clear
      if (keyUpper === 'C') {
        examState.clearResponse();
        this.syncExamView();
      }
    });
  }
}

// Bootstrap on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new MockExamApp();
  app.init();
});
