import React, { Component } from "react";
import {randomWord} from './words';
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    randomWord, 
  };

  constructor(props) {
    super(props);
    this.state = { 
      nWrong: 0, 
      guessed: new Set(), 
      answer: String(randomWord()), 
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: String(randomWord()),
    })
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuess: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong; 
    const winner = this.guessedWord().join('') === this.state.answer;
    let display;
    if (gameOver){
      display = <p>You lose! The word was {this.state.answer}</p>
    } else if (winner) {
      display = <p>Winner winner chicken winner!</p>
    } else {
      display = <p className='Hangman-btns'>{this.generateButtons()}</p>
    }
    return (
      <div className='Hangman'>
        <div>
          <h1>Hangman</h1>
        </div>
        <img src={this.props.images[this.state.nWrong]} alt={this.state.nWrong + '/' + this.props.maxWrong}/>
        <p>Number of wrong guesses: {this.state.nWrong}</p>
        <p className='Hangman-word'>{!gameOver ? this.guessedWord() : this.state.answer}</p>
        <p>{display}</p>
        {/* {this.state.nWrong < this.props.maxWrong? <p className='Hangman-btns'>{this.generateButtons()}</p> : <p>You lose! The word was {this.state.answer}</p>}
        {Array.from(this.state.guessed).join('') === this.state.answer && <p>Winner winner chicken winner</p>} */}
        <button id='reset' onClick={this.reset}>Restart</button>
      </div>
    );
  }
}

export default Hangman;
