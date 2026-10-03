/**
 * State Management for Mock Test Simulation
 * Handles active test, response tracking, question statuses, and score calculations.
 */

export const QUESTION_STATUS = {
  NOT_VISITED: 'not_visited',       // Grey / White
  NOT_ANSWERED: 'not_answered',     // Red
  ANSWERED: 'answered',             // Green
  MARKED_FOR_REVIEW: 'marked_for_review', // Purple
  ANSWERED_MARKED: 'answered_marked' // Purple with green badge
};

class ExamStateManager {
  constructor() {
    this.reset();
  }

  reset() {
    this.activeTest = null;
    this.flattenedQuestions = [];
    this.currentQuestionIndex = 0;
    this.userAnswers = {}; // { [questionId]: optionIndex }
    this.questionStatuses = {}; // { [questionId]: status }
    this.questionTimeSpent = {}; // { [questionId]: seconds }
    this.timeRemainingSeconds = 0;
    this.totalDurationSeconds = 0;
    this.candidateName = "Candidate #2026";
    this.testStatus = 'idle'; // 'idle', 'in_progress', 'submitted'
    this.startTime = null;
    this.endTime = null;
    this.lastQuestionSwitchTimestamp = null;
  }

  initTest(testData, candidateName = "Candidate #2026") {
    this.reset();
    this.activeTest = testData;
    this.candidateName = candidateName;

    // Flatten all questions across sections with lookup indices
    let globalIndex = 0;
    this.flattenedQuestions = [];
    testData.sections.forEach((section, sIdx) => {
      section.questions.forEach((q, qIdx) => {
        const flatQ = {
          ...q,
          globalIndex: globalIndex++,
          sectionIndex: sIdx,
          sectionId: section.id,
          sectionName: section.name,
          questionInSectionIndex: qIdx
        };
        this.flattenedQuestions.push(flatQ);
        this.questionStatuses[flatQ.id] = QUESTION_STATUS.NOT_VISITED;
        this.questionTimeSpent[flatQ.id] = 0;
      });
    });

    this.currentQuestionIndex = 0;
    this.totalDurationSeconds = (testData.durationMinutes || 30) * 60;
    this.timeRemainingSeconds = this.totalDurationSeconds;
    this.testStatus = 'in_progress';
    this.startTime = Date.now();
    this.lastQuestionSwitchTimestamp = Date.now();

    // Mark the first question as NOT_ANSWERED (visited)
    if (this.flattenedQuestions.length > 0) {
      const firstId = this.flattenedQuestions[0].id;
      this.questionStatuses[firstId] = QUESTION_STATUS.NOT_ANSWERED;
    }
  }

  getCurrentQuestion() {
    return this.flattenedQuestions[this.currentQuestionIndex] || null;
  }

  recordTimeForCurrentQuestion() {
    const currentQ = this.getCurrentQuestion();
    if (!currentQ || !this.lastQuestionSwitchTimestamp) return;
    const now = Date.now();
    const elapsedSeconds = Math.round((now - this.lastQuestionSwitchTimestamp) / 1000);
    this.questionTimeSpent[currentQ.id] = (this.questionTimeSpent[currentQ.id] || 0) + elapsedSeconds;
    this.lastQuestionSwitchTimestamp = now;
  }

  jumpToQuestion(targetIndex) {
    if (targetIndex < 0 || targetIndex >= this.flattenedQuestions.length) return false;
    this.recordTimeForCurrentQuestion();

    // If leaving current question and it was visited but untouched, ensure it's recorded
    const prevQ = this.getCurrentQuestion();
    if (prevQ) {
      this.updateStatusOnLeave(prevQ.id);
    }

    this.currentQuestionIndex = targetIndex;
    const nextQ = this.getCurrentQuestion();
    if (nextQ && this.questionStatuses[nextQ.id] === QUESTION_STATUS.NOT_VISITED) {
      this.questionStatuses[nextQ.id] = QUESTION_STATUS.NOT_ANSWERED;
    }
    this.lastQuestionSwitchTimestamp = Date.now();
    return true;
  }

  updateStatusOnLeave(questionId) {
    const hasAnswer = this.userAnswers[questionId] !== undefined && this.userAnswers[questionId] !== null;
    const currentStatus = this.questionStatuses[questionId];

    if (currentStatus === QUESTION_STATUS.MARKED_FOR_REVIEW || currentStatus === QUESTION_STATUS.ANSWERED_MARKED) {
      this.questionStatuses[questionId] = hasAnswer ? QUESTION_STATUS.ANSWERED_MARKED : QUESTION_STATUS.MARKED_FOR_REVIEW;
    } else {
      this.questionStatuses[questionId] = hasAnswer ? QUESTION_STATUS.ANSWERED : QUESTION_STATUS.NOT_ANSWERED;
    }
  }

  selectOption(optionIndex) {
    const q = this.getCurrentQuestion();
    if (!q) return;
    this.userAnswers[q.id] = optionIndex;
    const currentStatus = this.questionStatuses[q.id];
    if (currentStatus === QUESTION_STATUS.MARKED_FOR_REVIEW || currentStatus === QUESTION_STATUS.ANSWERED_MARKED) {
      this.questionStatuses[q.id] = QUESTION_STATUS.ANSWERED_MARKED;
    } else {
      this.questionStatuses[q.id] = QUESTION_STATUS.ANSWERED;
    }
  }

  clearResponse() {
    const q = this.getCurrentQuestion();
    if (!q) return;
    delete this.userAnswers[q.id];
    const currentStatus = this.questionStatuses[q.id];
    if (currentStatus === QUESTION_STATUS.ANSWERED_MARKED || currentStatus === QUESTION_STATUS.MARKED_FOR_REVIEW) {
      this.questionStatuses[q.id] = QUESTION_STATUS.MARKED_FOR_REVIEW;
    } else {
      this.questionStatuses[q.id] = QUESTION_STATUS.NOT_ANSWERED;
    }
  }

  saveAndNext() {
    const currentQ = this.getCurrentQuestion();
    if (currentQ) {
      const hasAnswer = this.userAnswers[currentQ.id] !== undefined;
      const status = this.questionStatuses[currentQ.id];
      if (status === QUESTION_STATUS.MARKED_FOR_REVIEW || status === QUESTION_STATUS.ANSWERED_MARKED) {
        this.questionStatuses[currentQ.id] = hasAnswer ? QUESTION_STATUS.ANSWERED_MARKED : QUESTION_STATUS.MARKED_FOR_REVIEW;
      } else {
        this.questionStatuses[currentQ.id] = hasAnswer ? QUESTION_STATUS.ANSWERED : QUESTION_STATUS.NOT_ANSWERED;
      }
    }

    if (this.currentQuestionIndex < this.flattenedQuestions.length - 1) {
      return this.jumpToQuestion(this.currentQuestionIndex + 1);
    }
    return false; // Reached end
  }

  markForReviewAndNext() {
    const currentQ = this.getCurrentQuestion();
    if (currentQ) {
      const hasAnswer = this.userAnswers[currentQ.id] !== undefined;
      this.questionStatuses[currentQ.id] = hasAnswer ? QUESTION_STATUS.ANSWERED_MARKED : QUESTION_STATUS.MARKED_FOR_REVIEW;
    }

    if (this.currentQuestionIndex < this.flattenedQuestions.length - 1) {
      return this.jumpToQuestion(this.currentQuestionIndex + 1);
    }
    return false;
  }

  previous() {
    if (this.currentQuestionIndex > 0) {
      return this.jumpToQuestion(this.currentQuestionIndex - 1);
    }
    return false;
  }

  getPaletteSummary() {
    let answered = 0;
    let notAnswered = 0;
    let notVisited = 0;
    let marked = 0;
    let answeredMarked = 0;

    this.flattenedQuestions.forEach(q => {
      const status = this.questionStatuses[q.id] || QUESTION_STATUS.NOT_VISITED;
      switch (status) {
        case QUESTION_STATUS.ANSWERED:
          answered++;
          break;
        case QUESTION_STATUS.NOT_ANSWERED:
          notAnswered++;
          break;
        case QUESTION_STATUS.MARKED_FOR_REVIEW:
          marked++;
          break;
        case QUESTION_STATUS.ANSWERED_MARKED:
          answeredMarked++;
          break;
        case QUESTION_STATUS.NOT_VISITED:
        default:
          notVisited++;
          break;
      }
    });

    return {
      answered,
      notAnswered,
      notVisited,
      marked,
      answeredMarked,
      total: this.flattenedQuestions.length
    };
  }

  calculateResults() {
    this.recordTimeForCurrentQuestion();
    this.endTime = Date.now();
    this.testStatus = 'submitted';

    const markingScheme = this.activeTest.markingScheme || { correct: 1, incorrect: 0 };
    const correctMark = Number(markingScheme.correct) || 1;
    const negativeMark = Number(markingScheme.incorrect) || 0; // Usually negative or 0

    let totalScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    const maxScore = this.flattenedQuestions.length * correctMark;

    // Detailed question outcomes
    const questionOutcomes = this.flattenedQuestions.map(q => {
      const userChoice = this.userAnswers[q.id];
      const hasAnswered = userChoice !== undefined && userChoice !== null;
      const isCorrect = hasAnswered && Number(userChoice) === Number(q.correctAnswer);
      const isIncorrect = hasAnswered && !isCorrect;
      const isUnattempted = !hasAnswered;

      let marksAwarded = 0;
      if (isCorrect) {
        marksAwarded = correctMark;
        correctCount++;
        totalScore += correctMark;
      } else if (isIncorrect) {
        marksAwarded = negativeMark;
        incorrectCount++;
        totalScore += negativeMark;
      } else {
        unattemptedCount++;
      }

      return {
        ...q,
        userChoice,
        isCorrect,
        isIncorrect,
        isUnattempted,
        marksAwarded,
        timeSpentSeconds: this.questionTimeSpent[q.id] || 0
      };
    });

    // Section-wise breakdown
    const sectionBreakdowns = this.activeTest.sections.map(sec => {
      const secQuestions = questionOutcomes.filter(q => q.sectionId === sec.id);
      const secCorrect = secQuestions.filter(q => q.isCorrect).length;
      const secIncorrect = secQuestions.filter(q => q.isIncorrect).length;
      const secUnattempted = secQuestions.filter(q => q.isUnattempted).length;
      const secScore = (secCorrect * correctMark) + (secIncorrect * negativeMark);
      const secMax = secQuestions.length * correctMark;
      const secAccuracy = (secCorrect + secIncorrect > 0)
        ? Math.round((secCorrect / (secCorrect + secIncorrect)) * 100)
        : 0;

      return {
        id: sec.id,
        name: sec.name,
        totalQuestions: secQuestions.length,
        correct: secCorrect,
        incorrect: secIncorrect,
        unattempted: secUnattempted,
        score: Number(secScore.toFixed(2)),
        maxScore: Number(secMax.toFixed(2)),
        accuracy: secAccuracy
      };
    });

    const attemptedCount = correctCount + incorrectCount;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const percentage = maxScore > 0 ? Math.max(0, Math.round((totalScore / maxScore) * 100)) : 0;
    const timeTakenSeconds = this.totalDurationSeconds - this.timeRemainingSeconds;

    return {
      testTitle: this.activeTest.title,
      candidateName: this.candidateName,
      totalQuestions: this.flattenedQuestions.length,
      attemptedCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      totalScore: Number(totalScore.toFixed(2)),
      maxScore: Number(maxScore.toFixed(2)),
      percentage,
      accuracy,
      timeTakenSeconds: Math.max(0, timeTakenSeconds),
      totalDurationSeconds: this.totalDurationSeconds,
      sectionBreakdowns,
      questionOutcomes
    };
  }
}

export const examState = new ExamStateManager();
