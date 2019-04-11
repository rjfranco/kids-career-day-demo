import Controller from '@ember/controller';

// Available colors ------
// pink, blue, red, green, grey

export default class IndexController extends Controller {
  colorVariation = 'pink';
  fontSize = 8;
  screenText = 'Replace this text with something fun!';

  get screenFontSize() {
    return `${this.fontSize}rem`;
  }
}
