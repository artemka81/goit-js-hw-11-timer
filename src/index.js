import './sass/main.scss';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timerId = null;
    this.targetDate = targetDate;
    this.selector = document.querySelector(selector);
    this.secs = this.selector.querySelector("[data-value='secs']");
    this.mins = this.selector.querySelector("[data-value='mins']");
    this.hours = this.selector.querySelector("[data-value='hours']");
    this.days = this.selector.querySelector("[data-value='days']");

    this.getTimeRemaining();
    this.initTimer();
  }

  getTimeRemaining() {
    const time = Date.parse(this.targetDate) - Date.parse(new Date());
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    return {
      time,
      days,
      hours,
      mins,
      secs,
    };
  }

  initTimer() {
    this.timerId = setInterval(() => {
      const t = this.getTimeRemaining();
      this.secs.textContent = t.secs < 10 ? `0${t.secs}` : t.secs;
      this.mins.textContent = t.mins < 10 ? `0${t.mins}` : t.mins;
      this.hours.textContent = t.hours < 10 ? `0${t.hours}` : t.hours;
      this.days.textContent = t.days < 10 ? `0${t.days}` : t.days;

      if (t.time <= 0) {
        clearInterval(this.timerId);
        this.secs.textContent = '00';
        this.mins.textContent = '00';
        this.hours.textContent = '00';
        this.days.textContent = '00';
        console.log('targetDate должна быть больше текущей даты');
      }
    }, 1000);
  }
}

const timer1 = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2022'),
});

const timer2 = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Sep 26, 2022'),
});
