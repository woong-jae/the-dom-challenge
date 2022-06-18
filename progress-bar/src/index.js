import './style.css';

class ProgressBar {
  #count = 0;
  constructor(el, n = 1000) {
    this.root = document.querySelector(el);
    this.duration = n;
    this.render();
    this.bindEvents();
  }

  render() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-wrapper');
    const progress = document.createElement('div');
    progress.classList.add('progress');
    progressBar.append(progress);

    const runBtn = document.createElement('button');
    runBtn.textContent = 'Run';
    runBtn.classList.add('progress-run-btn');

    this.root.append(progressBar, runBtn);
  }

  bindEvents() {
    this.root.addEventListener('click', this.handleRun);
  }

  handleRun = (event) => {
    if (!event.target.classList.contains('progress-run-btn')) return;
    this.#count++;
    event.target.textContent = `Run ${this.#count}`;
    if (this.#count > 1) return;

    let width = 0,
      progress = document.querySelector('.progress');
    const running = setInterval(() => {
      if (width < 1) {
        width += 100 / this.duration;
        if (width > 1) width = 1;
        progress.style.width = `${width * 100}%`;
      } else {
        if (--this.#count === 0) clearInterval(running);
        width = 0;
        event.target.textContent =
          this.#count < 1 ? 'Run' : `Run ${this.#count}`;
        progress.style.width = `${width}%`;
      }
    }, 100);
  };
}

new ProgressBar('#progress-bar', 1000);
