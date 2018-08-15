import React from 'react'
// import PropTypes from 'prop-types';
import '../css/quiz.css'
import { noteScores, randomizedQuizIds, hasStaff } from '../music' // change name of 'music.js' to 'helpers.js'
import Staff from './Staff'

class Quiz extends React.Component {
  /*
  Props: title: 'Primer book notes',
         pitches: ['a3b', 'b3b', 'd4t', 'e4t', 'f4t'],
         targetProgress: 5550,
  */
  constructor(props) {
    super(props);
    this.c = React.createRef()
    this.d = React.createRef()
    this.e = React.createRef()
    this.f = React.createRef()
    this.g = React.createRef()
    this.a = React.createRef()
    this.b = React.createRef()
  }

  state = {
    treble: hasStaff(this.props.pitches, 'treble'),
    bass: hasStaff(this.props.pitches, 'bass'),
    alto: hasStaff(this.props.pitches, 'alto'),
    noteScores: noteScores(this.props.pitches), //
    quizIds: randomizedQuizIds(this.props.pitches, 5), // returns array for whole quiz. 2nd arg is number of times for each pitch
    currentIdx: 0,
    currentPitch: null, // a noteId
    startTime: null,
    correct: null,
  }

  componentDidMount() {
    this.gameLoop(0)
  }

  showPitch(noteId) {
    return new Promise((resolve, reject) => {
      this.setState({ currentPitch: noteId, correct: null }, resolve(noteId))
    })
  }

  start = noteId => {
    const answer = Symbol(noteId[0])
    return new Promise((resolve, reject) => {
      console.log('answer: ', answer)
      console.log('this: ', this)
      this[answer].addEventListener('click', resolve) // this[answer] does not work.
      this.setState({ startTime: Date.now() })
    })
  }

  end = () => {
    const time = Date.now() - this.state.startTime
    const noteScores = { ...this.state.noteScores }
    noteScores[this.state.currentPitch].push(time)
    this.setState({ noteScores, correct: 'correct' })
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000)
    })
  }

  reset = () => {

  }

  gameLoop = (idx) => {
    if (idx >= this.state.quizIds.length) {
      this.props.stopQuiz() // Change to this.calculateScores().then(this.props.stopQuiz(scores)). calculateScores will be a promise.
    }
    const noteId = this.state.quizIds[idx]

    this.showPitch(noteId)    // sets currentPitch, correct: null
    .then(this.start(noteId)) // sets startTime,
    .then(this.end)         // resets startTime, saves score, animates note (waits for animation)
    .then(() => this.gameLoop(idx + 1))
  }

  handleAnyAnswer = e => {
    function reset() {
      setTimeout(() => this.setState({ correct: null}), 500)
    }
    const answer = e.target.innerText.toLowerCase()
    if (answer !== this.state.currentPitch[0]) {
      this.setState({ correct: 'oops' }, reset)
    }
  }

/*
  getNextPitch() {
    let currentIdx = this.state.currentIdx
    if (currentIdx >= this.props.pitches.length - 1) {
      this.nextRound()
      return
    } else {
      currentIdx += 1
    }
    this.setState({ currentIdx }, this.displayNextPitch)
  }

  displayNextPitch() {
    let { currentIdx, currentPitch } = { ...this.state }
    currentPitch = this.state.randomized[currentIdx]
    const startTime = Date.now()
    this.setState({ currentPitch, startTime })
  }

  // 1. randomized will be an array of randomized ids.
  // 2. moving through idx of randomized, currentPitch is goalData[idx].
  // 3. Pass pitch obj to staffs. Only correct staff should display it.
  // 4. When a new pitch displays, set startTime to new Date().
  // 5. When a correct answer is entered, set endTime to new Date().
  // 6. Subtract and save the difference under noteScores[currentPitch].

// Next steps:
// Get a note displayed. V
// Make answer buttons.  V
// Make answer function.  V
// Add .quizNote to staffnotes.scss and/or make new QuizNote component.
// Finish the quiz when all notes have been answered n times. V
// Randomize the order. V
// Compute average times for each note
// Display results
// Save results

// Later features:
// Style the answer buttons like piano keys
// Vibrate on touch
// Delay between notes: Animate the keypress, color the note, play the note, fade out.

  submitAnswer = e => {
    const answer = e.target.innerText
    if (answer === this.state.currentPitch[0].toUpperCase()) {
      this.handleCorrectAnswer()
    } else {
      this.handleIncorrectAnswer()
    }
  }

  handleCorrectAnswer() {
    const time = Date.now() - this.state.startTime
    const noteScores = { ...this.state.noteScores }
    noteScores[this.state.currentPitch].push(time)
    this.setState({ noteScores }, this.getNextPitch)
  }

  handleIncorrectAnswer() {
  }

  finishQuiz() {
    const noteScores = this.state.noteScores.slice()
    // const averageTimes;
    this.props.stopQuiz()
  }
  */

  render() {

    return (
      <main>
        <p><span className="title">{this.props.title}</span><span>{this.state.problemsLeft}</span> to go!
          <a className="pause" onClick={this.finishQuiz}>Stop</a>
        </p>
        {this.state.treble && <Staff staff='treble' quizPitchId={this.state.currentPitch} pitchStatus={this.state.correct}/>}
        {this.state.bass && <Staff staff='bass' quizPitchId={this.state.currentPitch} pitchStatus={this.state.correct} />}
        <section id="answers" onClick={this.handleAnyAnswer}>
          <div className="answer-button" ref={this.c}>C</div>
          <div className="answer-button" ref={this.d}>D</div>
          <div className="answer-button" ref={this.e}>E</div>
          <div className="answer-button" ref={this.f}>F</div>
          <div className="answer-button" ref={this.g}>G</div>
          <div className="answer-button" ref={this.a}>A</div>
          <div className="answer-button" ref={this.b}>B</div>
        </section>

      </main>
    )
  }
}
export default Quiz
