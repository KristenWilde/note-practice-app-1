import React from 'react'
// import PropTypes from 'prop-types';
import '../css/quiz.css'
import { noteScores, randomizedQuizIds, hasStaff, quizResults, pitchIdsForStaff, staffLinesTop, staffWrapperHeight } from '../music' // change name of 'music.js' to 'helpers.js'
import Staff from './Staff'

class Quiz extends React.Component {
  /*
  Props: title: 'Primer book notes',
         pitches: ['a3b00', 'b3b01', 'd4t-2', 'e4t-1', 'f4t00'],
         targetProgress: 5550,
  */
  state = {
    showTreble: hasStaff(this.props.pitches, 'treble'),
    showBass: hasStaff(this.props.pitches, 'bass'),
    showAlto: hasStaff(this.props.pitches, 'alto'),
    quizIds: randomizedQuizIds(this.props.pitches, 1), // returns array for whole quiz. 2nd arg is number of times for each pitch
    noteScores: noteScores(this.props.pitches),
    idx: 0,
    currentPitch: null, // a noteId
    startTime: null,
    correct: null,
  }


  componentDidMount() {
    this.setSpacing()
    this.showNextPitch()
  }

  setSpacing() {
    let trebleTop = 0
    let trebleHeight = 12
    let bassTop = 0
    let bassHeight = 10
    let altoTop = 0
    let altoHeight = 10
    if (hasStaff(this.props.pitches, 'treble')){
      const treblePitchIds = pitchIdsForStaff(this.props.pitches, 'treble')
      trebleTop = staffLinesTop(treblePitchIds)
      trebleHeight = staffWrapperHeight(treblePitchIds)
    }
    if (hasStaff(this.props.pitches, 'bass')){
      const bassPitchIds = pitchIdsForStaff(this.props.pitches, 'bass')
      bassTop = staffLinesTop(bassPitchIds)
      bassHeight = staffWrapperHeight(bassPitchIds)
    }
    if (hasStaff(this.props.pitches, 'alto')){
      const altoPitchIds = pitchIdsForStaff(this.props.pitches, 'alto')
      altoTop = staffLinesTop(altoPitchIds)
      altoHeight = staffWrapperHeight(altoPitchIds)
    }
    this.setState({ trebleTop, trebleHeight, bassTop, bassHeight, altoTop, altoHeight })
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

  pianoAnimation(e) {
    e.currentTarget.classList.add('pressed')
  }

  resetPianoAnimation(e) {
    e.currentTarget.classList.remove('pressed')
  }

  render() {
    return (
      <div>
        <header className="quiz">
          <h4>{this.props.title}</h4>
          <p className="problemsleft">{this.state.quizIds.length - this.state.idx + 1} notes to go!</p>
          {
            <a className="pause" onClick={this.pause}>
              Pause
            </a>
          }
        </header>
        {this.state.showTreble && (
          <Staff
            staff="treble"
            quizPitchId={this.state.currentPitch}
            pitchStatus={this.state.correct}
            showNextPitch={this.showNextPitch}
            resetStatus={this.resetStatus}
            top={this.state.trebleTop}
            height={this.state.trebleHeight}
          />
        )}
        {this.state.showBass && (
          <Staff
            staff="bass"
            quizPitchId={this.state.currentPitch}
            pitchStatus={this.state.correct}
            showNextPitch={this.showNextPitch}
            resetStatus={this.resetStatus}
            top={this.state.bassTop}
            height={this.state.bassHeight}
          />
        )}
        {this.state.showAlto && (
          <Staff
            staff="alto"
            quizPitchId={this.state.currentPitch}
            pitchStatus={this.state.correct}
            showNextPitch={this.showNextPitch}
            resetStatus={this.resetStatus}
            top={this.state.altoTop}
            height={this.state.altoHeight}
          />
        )}
        <section id="keyboard">
          <div id="answers" onClick={this.handleAnswer}>
            {['C','D','E','F','G','A','B'].map(letter => (
              <div className="answer-button" 
                onClick={this.pianoAnimation}
                onAnimationEnd={this.resetPianoAnimation}
                key={letter}
              >
                <span>{letter}</span>
              </div>
            ))}
          </div>
          <div id="black-key1" className="black-key">
            <div />
            <div />
          </div>
          <div id="black-key2" className="black-key">
            <div />
            <div />
          </div>
          <div id="black-key3" className="black-key">
            <div />
            <div />
          </div>
          <div id="black-key4" className="black-key">
            <div />
            <div />
          </div>
          <div id="black-key5" className="black-key">
            <div />
            <div />
          </div>
        </section>
      </div>
    )
  }
}
export default Quiz
