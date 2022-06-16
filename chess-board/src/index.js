import './style.css';

class ChessBoard {
  constructor(el) {
    this.root = document.querySelector(el);
    this.root.classList.add('chessboard');
    this.createChessBoard();
    this.handleClick();
  }
  createChessBoard() {
    const fragment = document.createDocumentFragment();

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const chessCol = document.createElement('div');
        chessCol.classList.add('chess-col');
        if ((row + col) % 2) chessCol.classList.add('chess-col-odd');
        chessCol.dataset.index = row * 8 + col;
        fragment.append(chessCol);
      }
    }

    this.root.append(fragment);
  }
  handleClick() {
    this.root.addEventListener('click', (event) => {
      if (!event.target.classList.contains('chess-col')) return;
      const targetIndex = +event.target.dataset.index;
      const targetRow = Math.floor(targetIndex / 8),
        targetCol = targetIndex % 8;

      const children = this.root.children;
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          children[row * 8 + col].classList.remove('highlight');
          if (Math.abs(targetRow - row) !== Math.abs(targetCol - col)) continue;
          children[row * 8 + col].classList.add('highlight');
        }
      }
    });
  }
}

new ChessBoard('#grid');
