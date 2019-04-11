import Component from '@glimmer/component';

function range(start, finish) {
  return (finish - start) * Math.random() + start;
}

class Confetti {
  constructor({ color, width, height, drawCircle, sizeMultiplier }) {
    this.color = color;
    this.drawCircle = drawCircle;
    this.height = height;
    this.rgb = `rgba(${this.color[0]},${this.color[1]},${this.color[2]}`;
    this.r = Math.floor(range(3,9) * sizeMultiplier);
    this.r2 = 2 * this.r;
    this.width = width;
    this.replace()
  }

  replace() {
    this.opacity = 0;
    this.dop = .03 * range(1, 4);
    this.x = range(-this.r2, this.width - this.r2);
    this.y = range(-20, this.height - this.r2);
    this.xmax = this.width - this.r;
    this.ymax = this.height - this.r;
    this.vx = range(0, 2) + 8 * .5 - 5;
    this.vy = .3 * this.r + range(-1, 1);
  }

  draw() {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity += this.dop;
    
    if (this.opacity > 1) {
      this.opacity = 1
      this.dop *= -1
    }
      
    if (this.opacity < 0 || this.y > this.ymax) this.replace();
    if (!(0 < this.x < this.xmax)) {
      this.x = (this.x + this.xmax) % this.xmax;
    }

    this.drawCircle(Math.floor(this.x), Math.floor(this.y), this.r, `${this.rgb},${this.opacity})`);
  }
}

export default class ConfettiBoxComponent extends Component {
  PI_2 = 2 * Math.PI;
  confetti = [];

  constructor() {
    super(...arguments);
  }

  startAnimation(canvas, [confettiBox]) {
    confettiBox.context = canvas.getContext('2d');
    confettiBox.height = canvas.height = window.innerHeight;
    confettiBox.width = canvas.width = window.innerWidth;

    let confettiOptions = {
      drawCircle: confettiBox.drawCircle.bind(confettiBox),
      height: confettiBox.height,
      sizeMultiplier: confettiBox.args.sizeMultiplier,
      width: confettiBox.width
    }

    for (let i = 0; i < confettiBox.args.numberOfConfetti; i++) {
      let color = confettiBox.color();
      confettiOptions.color = confettiBox.color();
      confettiBox.confetti.push(new Confetti(confettiOptions));
    }

    confettiBox.step();
  }

  drawCircle(x, y, r, style) {
    this.context.beginPath();
    this.context.arc(x, y, r, 0, this.PI_2, false);
    this.context.fillStyle = style;
    this.context.fill();
  }

  color() {
    return this.scheme(Math.floor(range(0,5)));
  }

  scheme(number) {
    let colorVariation = this.args.colorVariation;
    let shades = {
      grey: [[0, 0, 0], [50, 50, 50], [100, 100, 100], [125, 125, 125], [175, 175, 175]],
      pink: [[255, 100, 100], [255, 150, 150], [255, 175, 175], [255, 200, 200], [255, 225, 225]]
    }

    if (colorVariation) {
      return shades[colorVariation][number];
    }

    return shades['grey'][number];
  }

  step() {
    requestAnimationFrame(this.step.bind(this));
    this.context.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.confetti.length; i++) {
      this.confetti[i].draw();
    }
  }
}
