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
    showStaff: {
      treble: hasStaff(this.props.pitches, 'treble'),
      bass: hasStaff(this.props.pitches, 'bass'),
      alto: hasStaff(this.props.pitches, 'alto'),
    },
    quizIds: randomizedQuizIds(this.props.pitches, 5), // returns array for whole quiz. 2nd arg is number of times for each pitch
    noteScores: noteScores(this.props.pitches),
    currentIdx: 0,
    currentPitch: null, // a noteId
    startTime: null,
    correct: null,
  }

  componentDidMount() {
    this.gameLoop(0)
  }

  gameLoop = (idx) => {
    if (idx >= 9) { //this.state.quizIds.length
      this.props.stopQuiz(undefined, this.averages())
      return
    }
    const noteId = this.state.quizIds[idx]
    this.showPitch(noteId)
    .then((noteId) => this.start(noteId)) // starts timer, attaches event listener to correct note.
    .then(this.end)           // ends timer, saves score, animates note.
    .then(() => this.gameLoop(idx + 1))
  }

  showPitch(noteId) {
    return new Promise((resolve, reject) => {
      this.setState({ currentPitch: noteId, correct: null }, resolve(noteId))
    })
  }

  start = noteId => {
    const answer = noteId[0]
    return new Promise((resolve, reject) => {
      this.setState({ startTime: Date.now() })
      this[answer].current.addEventListener('click', e => resolve(e, noteId))
    })
  }

  end = noteId => {
    const time = Date.now() - this.state.startTime
    let noteScores = { ...this.state.noteScores }
    noteScores[this.state.currentPitch].push(time)
    console.log(noteScores)
    this.setState({ noteScores, correct: 'correct', startTime: null })

    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000)
    })
  }

  handleAnyAnswer = e => {
    const answer = e.target.innerText.toLowerCase()
    if (answer !== this.state.currentPitch[0]) {
      this.setState({ correct: 'incorrect' }, reset)
    }
    function reset() {
      setTimeout(() => this.setState({ correct: null}), 500)
    }
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
      <main>
        <p><span className="title">{this.props.title}</span><span>{this.state.problemsLeft}</span> to go!
          <a className="pause" onClick={this.finishQuiz}>Stop</a>
        </p>
        {this.state.showStaff.treble && <Staff staff='treble' quizPitchId={this.state.currentPitch} pitchStatus={this.state.correct}/>}
        {this.state.showStaff.bass   && <Staff staff='bass' quizPitchId={this.state.currentPitch} pitchStatus={this.state.correct} />}
        <section id="keyboard">
          <div id="black-key-wrapper">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div id="answers" onClick={this.handleAnyAnswer}>
            <div className="answer-button" ref={this.c}><span>C</span></div>
            <div className="answer-button" ref={this.d}><span>D</span></div>
            <div className="answer-button" ref={this.e}><span>E</span></div>
            <div className="answer-button" ref={this.f}><span>F</span></div>
            <div className="answer-button" ref={this.g}><span>G</span></div>
            <div className="answer-button" ref={this.a}><span>A</span></div>
            <div className="answer-button" ref={this.b}><span>B</span></div>
          </div>
        </section>

      </main>
    )
  }
}
export default Quiz
