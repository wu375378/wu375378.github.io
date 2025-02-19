/* canvas */
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
function setCanvasSize(){ 
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};
setCanvasSize();

window.addEventListener('resize' , () => {
  let cvsW = canvas.width;
  let cvsNewW = canvas.offsetWidth;
  let cvsH = canvas.height;
  let cvsNewH = canvas.offsetHeight;
  if ( Math.abs(cvsH - cvsNewH) > 100 || Math.abs(cvsW - cvsNewW) > 100 ) {
    setCanvasSize();
    particleNum = ( Math.trunc(Math.sqrt(canvas.width)/1.3 ) );
    resizeRender();
  }
});
/* canvas */


/* animate */

let particleNum = ( Math.trunc(Math.sqrt(canvas.width)/1.3 ) );
const particles = [];

class ParticleState{
  constructor(x, y, radius, directionX, directionY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.directionX = directionX;
    this.directionY = directionY;
  }
  render() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2, true);
    ctx.fillStyle = '#666';
    ctx.fill();
  }
  update() {
    this.y += this.directionY;
    if (this.y < 0 - this.radius) {
      this.y = canvas.height + this.radius;
    }
    this.render();
  }
}

function init() {
  for(let i = 0; i < particleNum; i++ ) {
    const directionXmax = 0.99;
    const directionXmin = 0.1;
    const directionYmax = 0.35;
    const directionYmin = 0.1;
    const x = Math.random() * canvas.width;
    const y = Math.floor(Math.random() * canvas.height);
    const radius =  Math.floor((Math.random() * ( 0.9999 - 0.15 ) + 0.15 ) * Math.trunc(Math.sqrt(canvas.width)) * 3.5 );
    const directionX = (Math.random() * (directionXmax - directionXmin) + directionXmin) * 2;
    const directionY = (Math.random() * (directionYmax - directionYmin) + directionXmin) * 2 * -1;
    const particle = new ParticleState(x, y, radius, directionX, directionY);
    particles.push(particle);
  }
}
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < particles.length; i++) {
    particles[i].update();
  }
  requestAnimationFrame(render);
}

init();
render();

function resizeRender() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.length = 0;
  init();
}

/* animate */