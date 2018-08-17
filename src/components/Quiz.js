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
  // constructor(props) {
  //   super(props);
  //   this.c = React.createRef()
  //   this.d = React.createRef()
  //   this.e = React.createRef()
  //   this.f = React.createRef()
  //   this.g = React.createRef()
  //   this.a = React.createRef()
  //   this.b = React.createRef()
  //   this.quiz = React.createRef()
  // }

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

  // gameLoop = (idx) => {
  //   if (idx >= 9) { //this.state.quizIds.length
  //     this.props.stopQuiz(undefined, this.averages())
  //     return
  //   }
  //   const noteId = this.state.quizIds[idx]
  //   this.showPitch(noteId)
  //   .then(this.startTimer) // starts timer, attaches event listener to correct note.
  //   .then(this.startAnimation)           // ends timer, saves score, animates note.
  //   .then(() => this.gameLoop(idx + 1))
  // }

  showNextPitch = e => {
    const idx = this.state.idx
    if (idx >= 6){//this.state.quizIds.length) {
      this.props.stopQuiz(this.averages())
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
    // Could use the following if there's a problem with this.state.correct.
    // function reset() {
    //   setTimeout(() => this.setState({ correct: null}), 500)
    // }
  }

  stopTimerAndStartAnimation() {
    const time = Date.now() - this.state.startTime
    let noteScores = { ...this.state.noteScores }
    noteScores[this.state.currentPitch].push(time)
    this.setState({ noteScores, correct: 'correct', startTime: null })
  }

  averages() {
    const averages = this.props.pitches.reduce((obj, noteId) => {
      const scores = this.state.noteScores[noteId]
      obj[noteId] = scores.reduce((sum, score) => sum + score) / scores.length
      return obj
    }, {})
    console.log(averages)
    return averages
  }

  render() {

    return (
      <main ref={this.quiz}>
        <header>
          <p className="title"><h4>{this.props.title}</h4></p>
          <p className="problemsleft">{this.state.quizIds.length - this.state.currentIdx} notes to go!</p>
          <p><a className="pause" onClick={this.finishQuiz}>Pause</a></p>
        </header>
        {this.state.showStaff.treble &&
          <Staff
            staff='treble'
            quizPitchId={this.state.currentPitch}
            pitchStatus={this.state.correct}
            showNextPitch={this.showNextPitch}
          />
        }
        {this.state.showStaff.bass &&
          <Staff
            staff='bass'
            quizPitchId={this.state.currentPitch}
            pitchStatus={this.state.correct}
            showNextPitch={this.showNextPitch}
          />
        }
        <section id="keyboard">
          <div id="answers" onClick={this.handleAnswer}>
            <div className="answer-button" ref={this.c}><span>C</span></div>
            <div className="answer-button" ref={this.d}><span>D</span></div>
            <div className="answer-button" ref={this.e}><span>E</span></div>
            <div className="answer-button" ref={this.f}><span>F</span></div>
            <div className="answer-button" ref={this.g}><span>G</span></div>
            <div className="answer-button" ref={this.a}><span>A</span></div>
            <div className="answer-button" ref={this.b}><span>B</span></div>
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
