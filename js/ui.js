/**
 * UI Rendering and DOM Interactions Module
 */

import { QUESTION_STATUS } from './state.js';

export const UI = {
  // Switch visible screen view
  showView(viewId) {
    document.querySelectorAll('.view-section').forEach(view => {
      view.classList.remove('active');
    });
    const target = document.getElementById(viewId);
    if (target) {
      target.classList.add('active');
      window.scrollTo(0, 0);
    }
  },

  // Toast notifications
  showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 200ms ease';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  },

  // Modal helpers
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('open');
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
  },

  // Render question text with safe code block formatting
  formatQuestionPrompt(text) {
    if (!text) return "";
    // Check if contains markdown code blocks ```
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    let formatted = text.replace(codeBlockRegex, (match, lang, code) => {
      return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
    });

    // Replace inline `code`
    formatted = formatted.replace(/`([^`]+)`/g, (match, code) => {
      return `<code>${escapeHtml(code)}</code>`;
    });

    // If no pre blocks, escape and preserve newlines
    if (!formatted.includes('<pre>')) {
      formatted = escapeHtml(text).replace(/\n/g, '<br/>');
    }

    return formatted;
  },

  // Render Question into Exam Area
  renderQuestion(question, userSelection, markingScheme, currentIndex, totalQuestions) {
    const container = document.getElementById('questionDisplayArea');
    if (!container || !question) return;

    const correctMark = markingScheme?.correct ?? 1;
    const negativeMark = markingScheme?.incorrect ?? 0;
    const negDisplay = negativeMark < 0 ? `${negativeMark}` : (negativeMark > 0 ? `-${negativeMark}` : `0`);

    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    const optionsHtml = question.options.map((optText, idx) => {
      const isSelected = userSelection !== undefined && userSelection === idx;
      const letter = letters[idx] || (idx + 1);
      return `
        <div class="option-item ${isSelected ? 'selected' : ''}" data-option-index="${idx}">
          <div class="option-label-circle">${letter}</div>
          <div class="option-text">${escapeHtml(optText)}</div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="question-meta-bar">
        <div class="question-no-tag">
          <span>Question ${currentIndex + 1}</span>
          <span class="badge badge-primary">${escapeHtml(question.sectionName || 'General')}</span>
        </div>
        <div class="question-marks-tag">
          <span>Marking: <span class="marks-positive">+${correctMark}</span> / <span class="marks-negative">${negDisplay}</span></span>
        </div>
      </div>
      <div class="question-content-container">
        <div class="question-prompt">${this.formatQuestionPrompt(question.question)}</div>
        <div class="options-list" id="optionsListContainer">
          ${optionsHtml}
        </div>
      </div>
    `;

    // Update Question Counter indicator
    const counterEl = document.getElementById('examQuestionCounter');
    if (counterEl) {
      counterEl.textContent = `Q ${currentIndex + 1} of ${totalQuestions}`;
    }

    // Previous Button state
    const prevBtn = document.getElementById('btnPrevQuestion');
    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
      prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
    }

    // Next Button text
    const nextBtn = document.getElementById('btnSaveNext');
    if (nextBtn) {
      if (currentIndex === totalQuestions - 1) {
        nextBtn.innerHTML = `Save &amp; Finish &rarr;`;
      } else {
        nextBtn.innerHTML = `Save &amp; Next &rarr;`;
      }
    }
  },

  // Render Section Bar in Exam view
  renderSectionsBar(sections, activeSectionId, onSectionClick) {
    const container = document.getElementById('examSectionsBar');
    if (!container) return;

    container.innerHTML = sections.map(sec => {
      const isActive = sec.id === activeSectionId;
      return `
        <button class="section-tab-item ${isActive ? 'active' : ''}" data-section-id="${sec.id}">
          <span>${escapeHtml(sec.name)}</span>
          <span class="section-badge-count">${sec.questions.length}</span>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.section-tab-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const secId = btn.getAttribute('data-section-id');
        if (onSectionClick) onSectionClick(secId);
      });
    });
  },

  // Render Question Palette Grid & Legend Counts
  renderPalette(questions, currentQuestionIndex, questionStatuses, onQuestionClick) {
    const grid = document.getElementById('paletteQuestionsGrid');
    if (!grid) return;

    // Build question buttons
    grid.innerHTML = questions.map((q, idx) => {
      const status = questionStatuses[q.id] || QUESTION_STATUS.NOT_VISITED;
      const isCurrent = idx === currentQuestionIndex;
      return `
        <button class="palette-btn status-${status} ${isCurrent ? 'current' : ''}" data-index="${idx}" title="Question ${idx + 1} (${status.replace(/_/g, ' ')})">
          ${idx + 1}
        </button>
      `;
    }).join('');

    // Attach click listeners to palette buttons
    grid.querySelectorAll('.palette-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        if (onQuestionClick) onQuestionClick(idx);
      });
    });

    // Update legend summary counts
    let answered = 0, notAnswered = 0, notVisited = 0, marked = 0, answeredMarked = 0;
    questions.forEach(q => {
      const s = questionStatuses[q.id] || QUESTION_STATUS.NOT_VISITED;
      if (s === QUESTION_STATUS.ANSWERED) answered++;
      else if (s === QUESTION_STATUS.NOT_ANSWERED) notAnswered++;
      else if (s === QUESTION_STATUS.MARKED_FOR_REVIEW) marked++;
      else if (s === QUESTION_STATUS.ANSWERED_MARKED) answeredMarked++;
      else notVisited++;
    });

    setElText('countAnswered', answered);
    setElText('countNotAnswered', notAnswered);
    setElText('countNotVisited', notVisited);
    setElText('countMarked', marked);
    setElText('countAnsweredMarked', answeredMarked);
  },

  // Render Submission Confirmation Summary Modal
  renderSubmitModal(summary) {
    const body = document.getElementById('submitModalSummary');
    if (!body) return;

    body.innerHTML = `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:1.25rem; margin-bottom:1.25rem;">
        <h4 style="margin-bottom:0.75rem; color:#0f172a; font-weight:700;">Are you sure you want to end the test?</h4>
        <p style="color:#64748b; font-size:0.9rem; margin-bottom:1rem;">Once submitted, your responses will be scored and you cannot resume this attempt.</p>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; font-size:0.88rem;">
          <div style="padding:0.6rem; background:#dcfce7; border-radius:6px; color:#14532d; font-weight:600;">
            Answered: <strong>${summary.answered + summary.answeredMarked}</strong>
          </div>
          <div style="padding:0.6rem; background:#fee2e2; border-radius:6px; color:#7f1d1d; font-weight:600;">
            Unanswered: <strong>${summary.notAnswered + summary.notVisited}</strong>
          </div>
          <div style="padding:0.6rem; background:#f3e8ff; border-radius:6px; color:#581c87; font-weight:600;">
            Marked for Review: <strong>${summary.marked + summary.answeredMarked}</strong>
          </div>
          <div style="padding:0.6rem; background:#f1f5f9; border-radius:6px; color:#334155; font-weight:600;">
            Total Questions: <strong>${summary.total}</strong>
          </div>
        </div>
      </div>
    `;
  },

  // Render Full Question Paper modal
  renderQuestionPaperModal(questions, onJumpToQuestion) {
    const list = document.getElementById('questionPaperList');
    if (!list) return;

    list.innerHTML = questions.map((q, idx) => `
      <div style="padding:1rem; border:1px solid #e2e8f0; border-radius:8px; margin-bottom:1rem; background:#fff;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <span style="font-weight:700; font-size:0.95rem;">Q${idx + 1}. [${escapeHtml(q.sectionName || 'General')}]</span>
          <button class="btn btn-sm btn-secondary qp-jump-btn" data-index="${idx}">Jump to Question</button>
        </div>
        <p style="font-size:0.92rem; color:#1e293b; margin-bottom:0.75rem;">${escapeHtml(q.question)}</p>
        <div style="font-size:0.85rem; color:#64748b; padding-left:0.5rem;">
          ${q.options.map((opt, oIdx) => `<div>${String.fromCharCode(65 + oIdx)}) ${escapeHtml(opt)}</div>`).join('')}
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.qp-jump-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        UI.closeModal('questionPaperModal');
        if (onJumpToQuestion) onJumpToQuestion(idx);
      });
    });
  },

  // Render Results Screen
  renderResults(results, onFilterChange) {
    // Top Score & Hero Card
    setElText('resultTestTitle', results.testTitle);
    setElText('resultCandidateName', results.candidateName);
    setElText('resultScoreBig', results.totalScore);
    setElText('resultMaxScore', `out of ${results.maxScore} marks`);

    // Performance Badge
    const badgeEl = document.getElementById('resultPerformanceBadge');
    if (badgeEl) {
      if (results.percentage >= 70) {
        badgeEl.className = 'score-badge-status score-badge-qualified';
        badgeEl.textContent = 'Qualified / Excellent';
      } else if (results.percentage >= 45) {
        badgeEl.className = 'score-badge-status score-badge-review';
        badgeEl.textContent = 'Average / Review Needed';
      } else {
        badgeEl.className = 'score-badge-status';
        badgeEl.style.backgroundColor = '#fecaca';
        badgeEl.style.color = '#991b1b';
        badgeEl.textContent = 'Scope for Improvement';
      }
    }

    // Time Taken format
    const formatTime = (secs) => {
      const mins = Math.floor(secs / 60);
      const s = secs % 60;
      return `${mins}m ${s}s`;
    };
    setElText('resultTimeTakenTag', `Time Taken: ${formatTime(results.timeTakenSeconds)}`);
    setElText('resultAccuracyTag', `Accuracy: ${results.accuracy}%`);

    const secCount = results.securitySummary?.violationCount || 0;
    if (secCount === 0) {
      setElText('resultSecurityTag', '🛡️ Integrity: 0 Warnings (Clean)');
    } else {
      setElText('resultSecurityTag', `⚠️ Integrity: ${secCount} Security Flag${secCount > 1 ? 's' : ''}`);
    }

    // KPI Cards
    setElText('kpiTotalScore', `${results.totalScore} / ${results.maxScore}`);
    setElText('kpiAccuracy', `${results.accuracy}%`);
    setElText('kpiCorrect', results.correctCount);
    setElText('kpiIncorrect', results.incorrectCount);
    setElText('kpiUnattempted', results.unattemptedCount);

    // Section Breakdown Table
    const secTableBody = document.getElementById('sectionBreakdownTableBody');
    if (secTableBody) {
      secTableBody.innerHTML = results.sectionBreakdowns.map(sec => `
        <tr>
          <td style="font-weight:600; color:#0f172a;">${escapeHtml(sec.name)}</td>
          <td>${sec.totalQuestions}</td>
          <td style="color:#16a34a; font-weight:600;">${sec.correct}</td>
          <td style="color:#dc2626; font-weight:600;">${sec.incorrect}</td>
          <td style="color:#64748b;">${sec.unattempted}</td>
          <td style="font-weight:700;">${sec.score} / ${sec.maxScore}</td>
          <td>
            <div class="section-progress-bar-bg">
              <div class="section-progress-fill" style="width:${sec.accuracy}%;"></div>
            </div>
            <span style="font-size:0.8rem; font-weight:600;">${sec.accuracy}%</span>
          </td>
        </tr>
      `).join('');
    }

    // Render Question Solution Reviews
    this.renderReviewQuestions(results.questionOutcomes, 'all');
  },

  // Render question-by-question solutions with explanation
  renderReviewQuestions(outcomes, currentFilter = 'all') {
    const container = document.getElementById('reviewQuestionsContainer');
    if (!container) return;

    let filtered = outcomes;
    if (currentFilter === 'correct') {
      filtered = outcomes.filter(q => q.isCorrect);
    } else if (currentFilter === 'incorrect') {
      filtered = outcomes.filter(q => q.isIncorrect);
    } else if (currentFilter === 'unattempted') {
      filtered = outcomes.filter(q => q.isUnattempted);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:3rem; background:#fff; border-radius:8px; border:1px solid #e2e8f0; color:#64748b;">
          No questions match this filter criteria.
        </div>
      `;
      return;
    }

    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    container.innerHTML = filtered.map(q => {
      let statusBadgeHtml = '';
      if (q.isCorrect) {
        statusBadgeHtml = `<span class="review-status-badge review-status-correct">✔ Correct (+${q.marksAwarded})</span>`;
      } else if (q.isIncorrect) {
        statusBadgeHtml = `<span class="review-status-badge review-status-incorrect">✖ Incorrect (${q.marksAwarded})</span>`;
      } else {
        statusBadgeHtml = `<span class="review-status-badge review-status-unattempted">⚪ Unattempted (0)</span>`;
      }

      const optionsHtml = q.options.map((optText, optIdx) => {
        const isCorrectKey = Number(q.correctAnswer) === optIdx;
        const isUserChoice = q.userChoice !== undefined && Number(q.userChoice) === optIdx;

        let itemClass = '';
        let tagHtml = '';

        if (isCorrectKey) {
          itemClass = 'is-correct-key';
          tagHtml = `<span class="review-option-tag review-tag-correct">Correct Answer</span>`;
        } else if (isUserChoice && !isCorrectKey) {
          itemClass = 'is-user-wrong';
          tagHtml = `<span class="review-option-tag review-tag-user-wrong">Your Answer (Wrong)</span>`;
        }

        return `
          <div class="review-option-item ${itemClass}">
            <span style="font-weight:700; margin-right:0.75rem; width:22px;">${letters[optIdx]})</span>
            <span>${escapeHtml(optText)}</span>
            ${tagHtml}
          </div>
        `;
      }).join('');

      return `
        <div class="review-card">
          <div class="review-card-header">
            <div>
              <span style="font-weight:700; font-size:1rem; margin-right:0.5rem;">Q${q.globalIndex + 1}.</span>
              <span class="badge badge-secondary">${escapeHtml(q.sectionName || 'General')}</span>
            </div>
            <div>
              ${statusBadgeHtml}
            </div>
          </div>

          <div class="review-question-text">
            ${this.formatQuestionPrompt(q.question)}
          </div>

          <div class="review-options-list">
            ${optionsHtml}
          </div>

          <!-- Explanation / Reason Box -->
          <div class="explanation-callout">
            <div class="explanation-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18h6"></path>
                <path d="M10 22h4"></path>
                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
              </svg>
              <span>Solution &amp; Explanation / Reason</span>
            </div>
            <div class="explanation-body">
              ${escapeHtml(q.explanation || 'No detailed reason provided.')}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
};

function escapeHtml(str) {
  if (typeof str !== 'string') return String(str);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function setElText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
