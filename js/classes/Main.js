import createHTMLElement from '../utils/createHTMLElement';
import { Hangman } from './Hangman';
import { Question } from './Question';
import { Keyboard } from './Keyboard';
import { Modal } from './Modal';
import questions from '../data/questions';

console.log('hangman');

export default class Main {
  constructor() {
    this.currInd = null;
    this.isEnd = false;
    this.createView();
    this.updateView();
  }

  createView() {
    const wrapper = createHTMLElement('div', 'wrapper', document.body);
    this.overlay = createHTMLElement('div', 'overlay', document.body);
    const title = createHTMLElement('h1', 'title', wrapper);
    title.innerText = 'Hangman Game';
    const mainContent = createHTMLElement('main', 'main', wrapper);
    const gallowsBox = createHTMLElement('div', 'gallows-box', mainContent);
    // const gameBox = createHTMLElement('div', 'game-box', mainContent);
    this.questionBox = createHTMLElement('div', 'question-box', mainContent);
    this.keyBoardBox = createHTMLElement('div', 'keyboard-box', mainContent);
    // wrapper.append(title);
    // wrapper.append(mainContent);
    // document.body.append(wrapper);

    this.hangman = new Hangman(gallowsBox);
    this.keyboard = new Keyboard(this.keyBoardBox);
    this.modal = new Modal(this.overlay);

    this.events();
  }

  updateView() {
    console.log('update');
    this.wrongAnswers = 0;
    this.currInd = this.getNewQuestion();
    console.log('newID', this.currInd);
    this.questionBox.innerHTML = '';
    this.question = new Question(this.currInd, this.questionBox);
    console.log('question1 = ', this.question);
  }

  events() {
    this.keyBoardBox.addEventListener(
      'click',
      this.clickOnVirtKeyboard.bind(this),
    );

    document.body.addEventListener(
      'keydown',
      this.clickOnPhysKeyboard.bind(this),
    );

    this.modal.playBtn.addEventListener('click', this.runNewGame.bind(this));
  }

  getNewQuestion() {
    console.log('current=', this.currInd);
    const l = questions.length;
    let randomInd;
    if (this.currInd) {
      do {
        randomInd = Math.floor(Math.random() * l);
      } while (randomInd === this.currInd);
    } else {
      randomInd = Math.floor(Math.random() * l);
    }

    return randomInd;
  }

  clickOnPhysKeyboard(e) {
    const physLetter = e.code[e.code.length - 1];
    console.log(physLetter);
    if (this.keyboard.alphabet.includes(physLetter)) {
      const keyButton = this.keyboard.keyButtons.find(
        (btn) => btn.innerText === physLetter,
      );

      this.checkLetter(physLetter, keyButton);
    }
  }

  clickOnVirtKeyboard(e) {
    console.log('click');
    const targetBtn = e.target;
    if (!targetBtn.classList.contains('key')) {
      return;
    }
    const letter = targetBtn.innerText;
    console.log('letter=', letter);
    console.log('question2 =', this.question);
    this.checkLetter(letter, targetBtn);
  }

  checkLetter(letter, currButton) {
    const btn = currButton;
    const isLetter = this.question.answer.includes(letter);
    if (!isLetter) {
      console.log('wrong');
      this.wrongAnswers += 1;
      this.question.setGuesses(this.wrongAnswers);
      this.hangman.addNextPart(this.wrongAnswers - 1);
    } else {
      const answerArr = this.question.answer.split('');
      answerArr.forEach((currLetter, ind) => {
        if (currLetter === letter) {
          this.question.openLetter(ind);
        }
      });
    }
    btn.disabled = true;
    this.checkGame();
  }

  checkGame() {
    if (this.wrongAnswers === 6) {
      console.log('kenny hanged');
      this.hangman.addHalo();
      // setTimeout(() => {

      // },2000)
      this.isEnd = 'fail';

      this.modal.showModal(this.isEnd, this.question.answer);
      this.overlay.classList.add('overlay-show');
    }

    const isCorrect = this.question.checkWord();
    if (isCorrect) {
      console.log('kenny saved');
      this.isEnd = 'win';
      this.modal.showModal(this.isEnd, this.question.answer);
      this.overlay.classList.add('overlay-show');
      // this.hangman.hangmanBody.forEach((part, i) => {
      //   if(i < 6) {
      //     part.classList.remove('hidden');
      //   }
      // })
    }
  }

  runNewGame() {
    this.updateView();
    this.hangman.hideMan();
    this.keyboard.updateView();
    this.modal.closeModal();
    this.overlay.classList.remove('overlay-show');
  }
}
