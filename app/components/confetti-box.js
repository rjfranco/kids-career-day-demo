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
      blue: [[130, 175, 255], [115, 160, 240], [80, 130, 215], [55, 105, 190], [35, 80, 160]],
      green: [[60, 170, 0], [50, 145, 0], [45, 125, 0], [40, 110, 0], [30, 90, 0]],
      grey: [[0, 0, 0], [50, 50, 50], [100, 100, 100], [125, 125, 125], [175, 175, 175]],
      orange: [[255, 215, 160], [255, 200, 120], [255, 190, 85], [255, 170, 40], [255, 155, 0]],
      pink: [[255, 195, 225], [255, 150, 205], [255, 100, 180], [255, 55, 160], [255, 0, 130]],
      purple: [[255, 180, 255], [240, 150, 240], [220, 115, 225], [205, 85, 205], [175, 40, 175]],
      rainbow: [[255, 0, 0], [240, 240, 0], [10, 185, 0], [0, 40, 195], [165, 0, 195]],
      red: [[255, 180, 180], [255, 140, 140], [255, 115, 115], [255, 65, 65], [255, 0, 0]],
      yellow: [[255, 255, 220], [255, 250, 180], [255, 250, 135], [255, 250, 65], [255, 245, 0]]
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
