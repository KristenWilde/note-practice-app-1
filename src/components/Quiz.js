import React from 'react'
// import PropTypes from 'prop-types';
import '../css/quiz.css'
import { noteScores, randomizedQuizIds, hasStaff, quizResults, pitchIdsForStaff, staffLinesTop, staffWrapperHeight } from '../music' // change name of 'music.js' to 'helpers.js'
import Staff from './Staff'
import QuizUI from './QuizUI'

class Quiz extends React.Component {
  /*
  Props: title: 'Primer book notes',
         pitchIds: ['a3b00', 'b3b01', 'd4t-2', 'e4t-1', 'f4t00'],
         targetProgress: 5550,
  */
  state = {
    // showTreble: hasStaff(this.props.pitchIds, 'treble'),
    // showBass: hasStaff(this.props.pitchIds, 'bass'),
    // showAlto: hasStaff(this.props.pitchIds, 'alto'),
    quizIds: randomizedQuizIds(this.props.pitchIds, 1), // returns array for whole quiz. 2nd arg is number of times for each pitch
    noteScores: noteScores(this.props.pitchIds),
    idx: 0,
    currentPitch: null, // a noteId
    startTime: null,
    correct: null,
  }


  componentDidMount() {
    this.showNextPitch()
  }


  showNextPitch = () => {
    const idx = this.state.idx
    if (idx >= this.state.quizIds.length) {
      this.props.stopQuiz(quizResults(this.state.noteScores))
      return
    }
    const currentPitch = this.state.quizIds[idx]
    this.setState(
      {
        currentPitch,
        correct: null,
        idx: idx + 1,
      },
      this.startTimer
    )
  }

  startTimer() {
    this.setState({ startTime: Date.now() })
  }

  handleAnswer = e => {
    const answer = e.target.innerText.toLowerCase()
    if (answer === this.state.currentPitch[0]) {
      this.stopTimerAndStartAnimation()
    } else {
      this.setState({ correct: 'incorrect' })
    }
  }

  stopTimerAndStartAnimation() {
    const time = Date.now() - this.state.startTime
    let noteScores = { ...this.state.noteScores }
    noteScores[this.state.currentPitch].push(time)
    this.setState({ noteScores, correct: 'correct', startTime: null })
  }

  resetStatus = () => {
    this.setState({ correct: null })
  }

  pause = (e) => {

  }

  render() {
    return (
      <QuizUI 
        title={this.props.title} 
        allPitchIds={this.props.pitchIds}
        problemsLeft={this.state.quizIds.length - this.state.idx + 1} 
        pause={this.pause}
        currentPitch={this.state.currentPitch}
        correct={this.state.correct}
        showNextPitch={this.showNextPitch} 
        resetStatus={this.resetStatus} 
        handleAnswer={this.handleAnswer}
      />
    )
  }
}
export default Quiz
