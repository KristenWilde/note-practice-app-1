import React from 'react'
// import PropTypes from 'prop-types';
import '../css/quiz.css'
import { goalData, noteScores, shuffleIds, hasStaff } from '../music' // change name of 'music.js' to 'helpers.js'
import Staff from './Staff'

class Quiz extends React.Component {
  /*
  Props: title: 'Primer book notes',
         pitches: ['a3b', 'b3b', 'd4t', 'e4t', 'f4t'],
         targetProgress: 5550,
  */
  state = {
    treble: hasStaff(this.props.pitches, 'treble'),
    bass: hasStaff(this.props.pitches, 'bass'),
    alto: hasStaff(this.props.pitches, 'alto'),
    noteScores: noteScores(this.props.pitches), //
    roundsPerSession: 5,
    randomized: this.props.pitches,
    currentIdx: 0,
    currentPitch: null, // a noteId
    startTime: null,
    round: 0,
  }

  componentDidMount() {
    this.nextRound()
  }

  nextRound() {
    let round = this.state.round
    if (round >= this.state.roundsPerSession) {
      this.props.stopQuiz()
      return
    }
    round += 1
    const randomized = shuffleIds(this.state.randomized)
    const currentIdx = 0
    this.setState({ round, randomized, currentIdx }, this.displayNextPitch)
  }

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
// Finish the quiz when all notes have been answered 3 times.
// Randomize the order.


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

  render() {

    return (
      <main>
        <p>You're practicing: <span className="title">{this.props.title}</span>.
          <a className="pause" onClick={this.props.stopQuiz}>Stop</a>
        </p>

        {this.state.treble && <Staff staff='treble' quizPitchId={this.state.currentPitch} pitchStatus={this.state.pitchStatus}/>}
        {this.state.bass && <Staff staff='bass' quizPitchId={this.state.currentPitch} pitchStatus={this.state.pitchStatus} />}
        <section id="answers" onClick={this.submitAnswer}>
          <div className="answer-button">C</div>
          <div className="answer-button">D</div>
          <div className="answer-button">E</div>
          <div className="answer-button">F</div>
          <div className="answer-button">G</div>
          <div className="answer-button">A</div>
          <div className="answer-button">B</div>
        </section>

      </main>
    )
  }
}
export default Quiz
