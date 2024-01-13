import createHTMLElement from '../utils/createHTMLElement';

export default class Keyboard {
  constructor(parent) {
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.keyButtons = [];
    this.createView(parent);
  }

  createView(par) {
    const keyboard = createHTMLElement('div', 'keyboard', par);

    for (let i = 0; i < this.alphabet.length; i += 1) {
      const keyLetter = this.alphabet[i];
      const keyBtn = createHTMLElement('button', 'key', keyboard);
      keyBtn.innerText = keyLetter;
      this.keyButtons.push(keyBtn);
      // keyElem.dataset.letter = keyLetter;
      // this.keyButtons[keyLetter] = keyElem;
    }
  }

  updateView() {
    this.keyButtons.forEach((btn) => {
      btn.disabled = false;
    });
  }
}
