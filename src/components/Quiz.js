import React from 'react'
// import PropTypes from 'prop-types';
import '../css/quiz.css'
import { noteScores, randomizedQuizIds, hasStaff, averageScores } from '../music' // change name of 'music.js' to 'helpers.js'
import Staff from './Staff'

class Quiz extends React.Component {
  /*
  Props: title: 'Primer book notes',
         pitches: ['a3b', 'b3b', 'd4t', 'e4t', 'f4t'],
         targetProgress: 5550,
  */
  state = {
    showStaff: {
      treble: hasStaff(this.props.pitches, 'treble'),
      bass: hasStaff(this.props.pitches, 'bass'),
      alto: hasStaff(this.props.pitches, 'alto'),
    },
    quizIds: randomizedQuizIds(this.props.pitches, 5), // returns array for whole quiz. 2nd arg is number of times for each pitch
    noteScores: noteScores(this.props.pitches),
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
      this.props.stopQuiz(averageScores(this.state.noteScores))
      return
    }
    const currentPitch = this.state.quizIds[idx]
    this.setState({
      currentPitch,
      correct: null,
      idx: idx + 1,
    }, this.startTimer)
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
    this.setState({ correct: null})
  }

  render() {
    return (
      <main>
        <header className="quiz">
          <h4>{this.props.title}</h4>
          <p className="problemsleft">{this.state.quizIds.length - this.state.idx + 1} notes to go!</p>
          {<a className="pause" onClick={this.pause}>Pause</a>}
        </header>
        {this.state.showStaff.treble &&
          <Staff
            staff='treble'
            quizPitchId={this.state.currentPitch}
            pitchStatus={this.state.correct}
            showNextPitch={this.showNextPitch}
            resetStatus={this.resetStatus}
          />
        }
        {this.state.showStaff.bass &&
          <Staff
            staff='bass'
            quizPitchId={this.state.currentPitch}
            pitchStatus={this.state.correct}
            showNextPitch={this.showNextPitch}
            resetStatus={this.resetStatus}
          />
        }
        {this.state.showStaff.alto &&
          <Staff
            staff='alto'
            quizPitchId={this.state.currentPitch}
            pitchStatus={this.state.correct}
            showNextPitch={this.showNextPitch}
            resetStatus={this.resetStatus}
          />
        }
        <section id="keyboard">
          <div id="answers" onClick={this.handleAnswer}>
            <div className="answer-button"><span>C</span></div>
            <div className="answer-button"><span>D</span></div>
            <div className="answer-button"><span>E</span></div>
            <div className="answer-button"><span>F</span></div>
            <div className="answer-button"><span>G</span></div>
            <div className="answer-button"><span>A</span></div>
            <div className="answer-button"><span>B</span></div>
          </div>
          <div id="black-key1" className="black-key"><div></div><div></div></div>
          <div id="black-key2" className="black-key"><div></div><div></div></div>
          <div id="black-key3" className="black-key"><div></div><div></div></div>
          <div id="black-key4" className="black-key"><div></div><div></div></div>
          <div id="black-key5" className="black-key"><div></div><div></div></div>
        </section>
      </main>
    )
  }
}
export default Quiz
