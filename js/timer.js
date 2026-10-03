/**
 * Exam Countdown Timer Module
 */

export class ExamTimer {
  constructor({ onTick, onWarning, onExpire }) {
    this.onTick = onTick || (() => {});
    this.onWarning = onWarning || (() => {});
    this.onExpire = onExpire || (() => {});
    this.intervalId = null;
    this.remainingSeconds = 0;
    this.warned5Min = false;
    this.warned1Min = false;
  }

  start(durationSeconds) {
    this.stop();
    this.remainingSeconds = Math.max(0, Math.floor(durationSeconds));
    this.warned5Min = false;
    this.warned1Min = false;

    // Initial tick
    this.onTick(this.formatTime(this.remainingSeconds), this.remainingSeconds, this.getStatus(this.remainingSeconds));

    this.intervalId = setInterval(() => {
      this.remainingSeconds--;

      const status = this.getStatus(this.remainingSeconds);
      this.onTick(this.formatTime(this.remainingSeconds), this.remainingSeconds, status);

      if (this.remainingSeconds === 300 && !this.warned5Min) {
        this.warned5Min = true;
        this.onWarning("5 minutes remaining! Review your answers.");
      } else if (this.remainingSeconds === 60 && !this.warned1Min) {
        this.warned1Min = true;
        this.onWarning("1 minute remaining! Finalize your test.");
      }

      if (this.remainingSeconds <= 0) {
        this.stop();
        this.onExpire();
      }
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getRemaining() {
    return this.remainingSeconds;
  }

  getStatus(seconds) {
    if (seconds <= 60) return "critical";
    if (seconds <= 300) return "warning";
    return "normal";
  }

  formatTime(totalSeconds) {
    if (totalSeconds < 0) totalSeconds = 0;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n) => String(n).padStart(2, '0');
    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  }
}
