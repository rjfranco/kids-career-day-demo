import Controller from '@ember/controller';

export default class IndexController extends Controller {
  // Available options are:
  // pink, blue, red, green, grey, purple, yellow, orange, rainbow, unicorn, mint
  colorVariation = 'pink';
  
  // Try using decimal values!
  confettiSizeMultiplier = 1;
  
  // Go wild here
  fontSize = 8;

  // Add as many or as little as you like
  numberOfConfetti = 250;

  // You can make this say whatever you want
  screenText = `Replace this text with something fun!`;

  // Wanna try tilting the text? give a value between 0 and 360
  textRotation = 5;



  // Don't modify below here!
  get screenTextRotation() {
    return `${this.textRotation}deg`;
  }

  get screenFontSize() {
    return `${this.fontSize}rem`;
  }
}
