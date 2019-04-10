import Component from '@glimmer/component';
import computed from '@ember/object';

const PI_2 = 2 * Math.PI;

function drawCircle(x, y, r, style) {

}

function range(start, finish) {
  return (finish - start) * Math.random() + start;
}

// NUM_CONFETTI = 350
// COLORS = [[85,71,106], [174,61,99], [219,56,83], [244,92,68], [248,182,70]]
// PI_2 = 2*Math.PI

// canvas = document.getElementById "world"
// context = canvas.getContext "2d"
// window.w = 0
// window.h = 0


// drawCircle = (x,y,r,style) ->
//   context.beginPath()
//   context.arc(x,y,r,0,PI_2,false)
//   context.fillStyle = style
//   context.fill()

// window.requestAnimationFrame = do ->
//   window.requestAnimationFrame       ||
//   window.webkitRequestAnimationFrame ||
//   window.mozRequestAnimationFrame    ||
//   window.oRequestAnimationFrame      ||
//   window.msRequestAnimationFrame     ||
//   (callback) -> window.setTimeout(callback, 1000 / 60)


// class Confetti

//   constructor: ->
//     @style = COLORS[~~range(0,5)]
//     @rgb = "rgba(#{@style[0]},#{@style[1]},#{@style[2]}"
//     @r = ~~range(2,6)
//     @r2 = 2*@r
//     @replace()

//   replace: ->
//     @opacity = 0
//     @dop = 0.03*range(1,4)
//     @x = range(-@r2,w-@r2)
//     @y = range(-20,h-@r2)
//     @xmax = w-@r
//     @ymax = h-@r
//     @vx = range(0,2)+8*xpos-5
//     @vy = 0.7*@r+range(-1,1)

//   draw: ->
//     @x += @vx
//     @y += @vy
//     @opacity += @dop
//     if @opacity > 1
//       @opacity = 1
//       @dop *= -1
//     @replace() if @opacity < 0 or @y > @ymax
//     if !(0 < @x < @xmax)
//       @x = (@x + @xmax) % @xmax
//     drawCircle(~~@x,~~@y,@r,"#{@rgb},#{@opacity})")


// confetti = (new Confetti for i in [1..NUM_CONFETTI])

// window.step = ->
//   requestAnimationFrame(step)
//   context.clearRect(0,0,w,h)
//   c.draw() for c in confetti

// step()


class Confetti {
  constructor(color, width, height) {
    this.color = color;
    this.height = height;
    this.rgb = `rgba(${this.color[0]},${this.color[1]},${this.color[2]}`;
    this.r = ~~range(2,6)
    this.r2 = 2*this.r
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
    this.vy = 0.7 * this.r + range(-1, 1);
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
    if (!(0 < this.x < this.xmax)) this.x = (this.x + this.xmax) % this.xmax;
    
    drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
  }
}

export default class ConfettiBoxComponent extends Component {
  constructor() {
    super(...arguments);
  }

  startAnimation() {
    console.log('we would theoretically start the animation');
  }

  // color: computed('scheme', function() {
  //   return this.scheme(Math.floor(range(0,5)));
  // })

  // scheme: computed('shade', function() {
  //   let shades = {
  //     pink: [[255, 100, 100], [255, 150, 150], [255, 175, 175], [255, 200, 200], [255, 225, 225]]
  //   }

  //   if (this.shade) {
  //     return shades[this.shade];
  //   }

  //   return [[0, 0, 0], [50, 50, 50], [100, 100, 100], [125, 125, 125], [175, 175, 175]];
  // })
  
}
