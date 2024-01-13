import questions from '../data/questions';
import createHTMLElement from '../utils/createHTMLElement';

export default class Question {
  constructor(currInd, parent) {
    this.hint = questions[currInd].question;
    this.answer = questions[currInd].answer;
    this.letters = [];
    this.maxGuesses = 6;
    this.createView(parent);
  }

  createView(parent) {
    const questionInner = createHTMLElement('div', 'question', parent);

    const answerElem = createHTMLElement('div', 'answer-box', questionInner);

    for (let i = 0; i < this.answer.length; i += 1) {
      const letterBox = createHTMLElement('div', 'letter-box', answerElem);
      const letterObj = {
        letter: '',
        elem: letterBox,
      };
      this.letters.push(letterObj);
    }

    const hintElem = createHTMLElement('div', 'hint', questionInner);
    hintElem.innerText = `Hint: ${this.hint}?`;
    const incorrGuesses = createHTMLElement('div', 'guesses', questionInner);
    const guessText = createHTMLElement('p', 'guess-text', incorrGuesses);
    guessText.innerHTML = 'Incorrect guesses:&nbsp;&nbsp;';
    this.guessCountElem = createHTMLElement('p', 'guess-count', incorrGuesses);
    this.guessCountElem.innerText = '0';
    const guessMaxElem = createHTMLElement('p', 'guess-max', incorrGuesses);
    guessMaxElem.innerText = ` / ${this.maxGuesses}`;
  }

  setGuesses(count) {
    this.guessCountElem.innerText = count;
  }

  openLetter(ind) {
    this.letters[ind].letter = this.answer[ind];
    this.letters[ind].elem.innerText = this.answer[ind];
  }

  checkWord() {
    const guessWord = this.letters.map((el) => el.letter).join('');
    if (guessWord === this.answer) {
      return true;
    }
    return false;
  }
}
