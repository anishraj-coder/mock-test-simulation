/**
 * Exam Security & Anti-Cheat Module (TCS iON / Assessment Simulation)
 * Provides easily configurable security guards:
 * - Disable text selection & right-click context menu
 * - Block copy/cut/paste clipboard events
 * - Intercept restricted dev/inspect shortcuts (F12, Ctrl+C, Ctrl+V, Ctrl+U, Ctrl+Shift+I)
 * - Tab-switch / Window blur detection with warning strikes
 * - Fullscreen monitoring
 */

export class ExamSecurity {
  constructor({ onViolation, onMaxViolationsExceeded, maxViolations = 3 }) {
    this.isActive = false;
    this.violationCount = 0;
    this.maxViolations = maxViolations;
    this.onViolation = onViolation || (() => {});
    this.onMaxViolationsExceeded = onMaxViolationsExceeded || (() => {});
    this.violationHistory = [];

    // Bound listeners for clean removal
    this._handleContextMenu = this._handleContextMenu.bind(this);
    this._handleCopyCutPaste = this._handleCopyCutPaste.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleVisibilityChange = this._handleVisibilityChange.bind(this);
    this._handleFullscreenChange = this._handleFullscreenChange.bind(this);
    this._handleWindowBlur = this._handleWindowBlur.bind(this);
  }

  enable() {
    if (this.isActive) return;
    this.isActive = true;
    this.violationCount = 0;
    this.violationHistory = [];

    // Add CSS guard class to body to prevent text selection during exam
    document.body.classList.add('exam-security-active');

    // Attach security event listeners
    window.addEventListener('contextmenu', this._handleContextMenu, { capture: true });
    window.addEventListener('copy', this._handleCopyCutPaste, { capture: true });
    window.addEventListener('cut', this._handleCopyCutPaste, { capture: true });
    window.addEventListener('paste', this._handleCopyCutPaste, { capture: true });
    window.addEventListener('keydown', this._handleKeyDown, { capture: true });
    document.addEventListener('visibilitychange', this._handleVisibilityChange);
    document.addEventListener('fullscreenchange', this._handleFullscreenChange);
    window.addEventListener('blur', this._handleWindowBlur);
  }

  disable() {
    if (!this.isActive) return;
    this.isActive = false;

    document.body.classList.remove('exam-security-active');

    window.removeEventListener('contextmenu', this._handleContextMenu, { capture: true });
    window.removeEventListener('copy', this._handleCopyCutPaste, { capture: true });
    window.removeEventListener('cut', this._handleCopyCutPaste, { capture: true });
    window.removeEventListener('paste', this._handleCopyCutPaste, { capture: true });
    window.removeEventListener('keydown', this._handleKeyDown, { capture: true });
    document.removeEventListener('visibilitychange', this._handleVisibilityChange);
    document.removeEventListener('fullscreenchange', this._handleFullscreenChange);
    window.removeEventListener('blur', this._handleWindowBlur);
  }

  _recordViolation(type, message) {
    if (!this.isActive) return;
    this.violationCount++;
    const record = {
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
      count: this.violationCount
    };
    this.violationHistory.push(record);

    this.onViolation(record, this.violationCount, this.maxViolations);

    if (this.violationCount >= this.maxViolations) {
      this.onMaxViolationsExceeded(record);
    }
  }

  _handleContextMenu(e) {
    if (!this.isActive) return;
    e.preventDefault();
    e.stopPropagation();
    this._recordViolation('context_menu', 'Right-click context menu is disabled during the exam.');
  }

  _handleCopyCutPaste(e) {
    if (!this.isActive) return;
    e.preventDefault();
    e.stopPropagation();
    this._recordViolation('clipboard', 'Clipboard operations (copy/cut/paste) are restricted.');
  }

  _handleKeyDown(e) {
    if (!this.isActive) return;

    const key = e.key.toLowerCase();
    const isCtrlOrMeta = e.ctrlKey || e.metaKey;

    // F12 DevTools
    if (e.key === 'F12') {
      e.preventDefault();
      e.stopPropagation();
      this._recordViolation('devtools', 'Developer tools shortcut (F12) is blocked.');
      return;
    }

    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (Inspect Element)
    if (isCtrlOrMeta && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
      e.preventDefault();
      e.stopPropagation();
      this._recordViolation('devtools', 'Inspect element shortcut is blocked.');
      return;
    }

    // Ctrl+U (View Source)
    if (isCtrlOrMeta && key === 'u') {
      e.preventDefault();
      e.stopPropagation();
      this._recordViolation('source_view', 'View source shortcut (Ctrl+U) is blocked.');
      return;
    }

    // Ctrl+P (Print)
    if (isCtrlOrMeta && key === 'p') {
      e.preventDefault();
      e.stopPropagation();
      this._recordViolation('print', 'Printing is disabled during the exam.');
      return;
    }

    // Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A (Select All / Copy / Paste)
    if (isCtrlOrMeta && ['c', 'v', 'x', 'a', 's'].includes(key)) {
      e.preventDefault();
      e.stopPropagation();
      this._recordViolation('clipboard', `Shortcut Ctrl+${key.toUpperCase()} is restricted.`);
      return;
    }
  }

  _handleVisibilityChange() {
    if (!this.isActive) return;
    if (document.hidden) {
      this._recordViolation('tab_switch', 'Tab switch or window minimization detected!');
    }
  }

  _handleWindowBlur() {
    if (!this.isActive) return;
    // Debounce to prevent duplicate with visibilitychange
    if (!document.hidden) {
      this._recordViolation('focus_lost', 'Window focus lost! Please remain on the exam screen.');
    }
  }

  _handleFullscreenChange() {
    if (!this.isActive) return;
    if (!document.fullscreenElement) {
      this._recordViolation('fullscreen_exit', 'Exited fullscreen mode! Please stay in fullscreen.');
    }
  }

  async requestFullscreen() {
    try {
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request declined or unsupported:", err);
    }
  }

  exitFullscreen() {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen exit error:", err);
    }
  }

  getSummary() {
    return {
      violationCount: this.violationCount,
      violationHistory: this.violationHistory
    };
  }
}
