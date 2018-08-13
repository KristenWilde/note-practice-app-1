import React from 'react'
// import PropTypes from 'prop-types';
import '../css/quiz.css'
import { goalData, noteScores, randomizedIds, hasStaff } from '../music' // change name of 'music.js' to 'helpers.js'
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
    randomized: randomizedIds(this.props.pitches),
    currentIdx: 0,
    currentPitch: null, // a noteId
    startTime: null,
    endTime: null,
  }

  componentDidMount() {
    this.nextPitch()
  }

  nextPitch() {
    let { currentIdx, currentPitch } = { ...this.state }
    currentIdx === this.props.pitches.length - 1 ? currentIdx = 0 : currentIdx++
    currentPitch = this.state.randomized[currentIdx]
    this.setState({ currentPitch, currentIdx })
  }

  // 1. randomized will be an array of randomized ids.
  // 2. moving through idx of randomized, currentPitch is goalData[idx].
  // 3. Pass pitch obj to staffs. Only correct staff should display it.
  // 4. When a new pitch displays, set startTime to new Date().
  // 5. When a correct answer is entered, set endTime to new Date().
  // 6. Subtract and save the difference under noteScores[currentPitch].

// Next steps:
// Get a note displayed.
// Make answer buttons.
// Make answer function.


  render() {

    return (
      <main>
        <p>You're practicing: <span className="title">{this.props.title}</span>.
          <a className="pause" onClick={this.props.stopQuiz}>Stop</a>
        </p>

        {this.state.treble && <Staff staff='treble' quizPitchId={this.state.currentPitch}/>}
        {this.state.bass && <Staff staff='bass' quizPitchId={this.state.currentPitch}/>}
        <section id="answers">
        Answer buttons go here.
        </section>

      </main>
    )
  }
}
export default Quiz
