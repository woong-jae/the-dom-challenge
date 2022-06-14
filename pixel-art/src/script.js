import './style.css';
/*
 * Creates pixel art grid
 * @param el DOM Element
 * @param rows Number of rows
 * @param cols Number of cols
 */
function PixelArt(el, rows, cols) {
  this.root = document.querySelector(el);
  this.setStyle(rows, cols);
  this.createGrid(rows, cols);
  this.handleDraw();
}

PixelArt.prototype.setStyle = function (rows, cols) {
  this.root.style.display = 'grid';
  this.root.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  this.root.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  this.root.style.gap = '0px';
  this.root.style.width = 'max-content';
  this.root.style.userSelect = 'none';
};

PixelArt.prototype.createGrid = function (rows, cols) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < cols * rows; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.dataset.index = i;
    fragment.append(pixel);
  }
  this.root.append(fragment);
};

PixelArt.prototype.handleDraw = function () {
  let state = null;

  this.root.addEventListener('mousedown', (event) => {
    state = event.target.classList.contains('pixel-on') ? 'erase' : 'draw';
    event.target.classList.toggle('pixel-on');
  });
  this.root.addEventListener('mouseover', (event) => {
    if (!state) return;
    if (!event.target.classList.contains('pixel')) return;

    if (state === 'draw') {
      event.target.classList.add('pixel-on');
    } else if (state === 'erase') {
      event.target.classList.remove('pixel-on');
    }
  });
  this.root.addEventListener('mouseup', () => {
    state = null;
  });
};
