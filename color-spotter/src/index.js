const getRandomColors = function() {
  var ratio = 0.618033988749895;

  var hue = (Math.random() + ratio) % 1;
  var saturation = Math.round(Math.random() * 100) % 85;
  var lightness = Math.round(Math.random() * 100) % 85;

  var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
  var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

  return {
    color,
    oddColor
  }
}

class ColorSpotter {
	constructor(el) {
  	this.root = document.querySelector(el);
  	this.score = 0;
    this.init();
  }
  
  init() {
  	const score = document.createElement("h2");
    score.textContent = `Score: ${this.score}`;
    score.style.textAlign = "center";
    
    const width = this.score + 4;
    
    const board = document.createElement("div");
		this.initStyle(board);
    
    board.append(this.createGridBlocks(width));
    
    board.addEventListener("click", event => {
    	if(event.target.classList.contains("odd")) {
      	this.score += 1;
      }
      else {
      	this.score = 0;
        board.classList.add("shake");
        setTimeout(() => board.classList.remove("shake"), 800);
      }
      const width = this.score + 4;
      score.textContent = `Score: ${this.score}`;
      board.innerHTML = "";
      board.style.gridTemplateRows = `repeat(${width}, 1fr)`;
    board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
      board.append(this.createGridBlocks(width));
    });
    
    this.root.append(score, board);
  }
  
  initStyle(board) {
  	board.style.display = "grid";
    board.style.gridTemplateRows = `repeat(4, 1fr)`;
    board.style.gridTemplateColumns = `repeat(4, 1fr)`;
    board.style.gap = "2px";
    board.style.width = "500px";
    board.style.height = "500px";
    board.style.alignItems = "stretch";
    board.style.border = "solid 4px";
    board.style.padding = "2px";
  }
  
  createGridBlocks(width) {
    const { color, oddColor } = getRandomColors();
  	
    const digit = Math.floor(width * width / 10);
    const answer = Math.floor(Math.random() * 10 ** (digit + 1)) % (width * width);
    
    const frag = document.createDocumentFragment();
    for(let i = 0; i < width * width; i++) {
    	const block = document.createElement("div");
      block.style.backgroundColor = i === answer ? oddColor : color;
      if(i === answer) block.classList.add("odd");
      frag.append(block);
    }
    
    return frag;
  }
}

new ColorSpotter("#spotter");
