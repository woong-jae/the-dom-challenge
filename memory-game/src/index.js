import './style.css';

class MemoryGame {
  constructor(query, length = 5) {
    this.root = document.querySelector(query);
    this.length = length;
    this.score = 0;
    this.high_score = 0;
    this.render();
  }

  render() {
    // Scoreboard
    const score_container = document.createElement('div');
    score_container.classList.add('memory-scoreboard');
    this.score_container = score_container;

    this.renderScoreboard();

    // Game blocks
    const block_container = document.createElement('div');
    block_container.classList.add('memory-block-container');
    block_container.style.gridTemplateColumns = `repeat(${this.length}, 1fr)`;
    block_container.style.height = this.root.clientWidth / this.length + 'px';

    for (let i = 0; i < this.length; i++) {
      const block = document.createElement('div');
      block.classList.add('memory-block');
      block.dataset.index = i;
      block_container.append(block);
    }

    this.block_container = block_container;

    // Start button
    const start_container = document.createElement('div');
    start_container.classList.add('memory-start');

    const start_button = document.createElement('button');
    start_button.innerText = 'START';
    start_button.addEventListener('click', this.handleStart);

    start_container.append(start_button);
    this.start_button = start_button;

    this.root.append(score_container, block_container, start_container);
  }

  renderScoreboard() {
    this.score_container.innerHTML = '';

    const current_score = document.createElement('div');
    current_score.innerText = `Score: ${this.score}`;
    const high_score = document.createElement('div');
    high_score.innerText = `High Score: ${this.high_score}`;

    this.score_container.append(current_score, high_score);
  }

  handleStart = (event) => {
    event.target.disabled = true;
    this.playGame();
  };

  playGame = () => {
    let count = 1;
    let answer = this.generateAnswer(count),
      solution = [];

    const handlePlay = (event) => {
      solution.push(+event.target.dataset.index);
      const end = solution.length - 1;

      if (solution[end] !== answer[end]) {
        // wrong answer
        event.target.classList.add('wrong');
        this.block_container.classList.add('shake');

        setTimeout(() => {
          event.target.classList.remove('wrong');
          this.block_container.classList.remove('shake');
        }, 500);

        this.score = 0;
        this.renderScoreboard();
        this.start_button.disabled = false;
        this.block_container.removeEventListener('click', handlePlay);
        return;
      } else {
        // correct answer
        event.target.classList.add('on');
        setTimeout(() => {
          event.target.classList.remove('on');
        }, 500);
      }

      if (solution.length === answer.length) {
        // next level
        this.score = count;
        this.high_score = Math.max(count, this.high_score);
        this.renderScoreboard();
        count++;

        setTimeout(() => {
          answer = this.generateAnswer(count);
          this.showAnswer(answer);
          solution = [];
        }, 1000);
      }
    };

    this.showAnswer(answer);
    this.block_container.addEventListener('click', handlePlay);
  };

  generateAnswer(length) {
    const ret = [];
    for (let i = 0; i < length; i++) {
      ret.push(Math.floor(Math.random() * this.length));
    }
    return ret;
  }

  showAnswer(answer) {
    const blocks = this.block_container.children;
    let index = 0;

    const toggleOn = () => {
      blocks[answer[index++]].classList.add('on');

      setTimeout(() => {
        blocks[answer[index - 1]].classList.remove('on');
        if (index < answer.length) {
          setTimeout(toggleOn, 500);
        }
      }, 500);
    };

    toggleOn();
  }
}

new MemoryGame('#memory-game', 7);
