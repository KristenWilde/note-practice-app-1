import React from 'react'
import PropTypes from 'prop-types'
import '../css/staffnotes.css'
import bassClefSign from '../images/bassclef.png'
import trebleClefSign from '../images/trebleclef.png'
import altoClefSign from '../images/altoclef.png'
import Note from './Note'
import { staffLinesTop, staffWrapperHeight } from '../music'

/* How this component will be used:
  <li>In Practice, it will show the pitches that are part of currentGoal (small).</li>
  <li>In Progress, it will show the pitches that are part of all goals, under 'By note' (large).
   When one is clicked, set state so that progress for that note will be shown below this component.</li>
  <li>Also in Progress, when a goal is selected, this display will be shown below the goal.
   Notes that have met the target will be highlighted. (small)</li>
  <li>In SetGoal, it will show all pitches (treble and bass staffs and ledger lines as selected).
   When one is clicked, it will appear 'disabled' and will not be included in the goal. (large)</li>*/

class Staff extends React.Component {
  // props: pitchObj: an object where keys are noteId's, values are empty string or 'selected'
  //        staff ('treble' or 'bass'),
  //        selectPitch function - takes (pitch, staff). Optional.
  //        quizPitch: a note id for the current quiz pitch.
  //        quizPitchStatus: a string 'incorrect', 'correct', ''
  quizNoteBelongs(){
    return this.props.quizPitchId[2] === this.props.staff[0]
  }

  render() {
    let notes;
    let quizNote;

    if (this.props.pitchesObj) {
      notes = Object.keys(this.props.pitchesObj).map( noteId => {
        return <Note
                  id={noteId}
                  status={this.props.pitchesObj ? this.props.pitchesObj[noteId] : null}
                  selectPitch={this.props.selectPitch}
                  staff={this.props.staff}
                  key={noteId}
                />
      })
    }

    if (this.props.quizPitchId && this.quizNoteBelongs()) {
      quizNote = <Note
                  id={this.props.quizPitchId}
                  status={this.props.pitchStatus}
                  noteType='quiz-note'
                  showNextPitch={this.props.showNextPitch}
                  resetStatus={this.props.resetStatus}
                />
    }

    return (
      <section className="staff-wrapper" style={{height: (this.props.height || staffWrapperHeight(this.props.pitchesObj)) + 'em'}}>
        <div className="staff-lines" style={{top: (this.props.top || staffLinesTop(this.props.pitchesObj)) + 'em'}}>
          {this.props.pitchesObj && notes}
          {this.props.quizPitchId && quizNote}
          {this.props.staff === 'treble' && <img id="trebleclef" src={trebleClefSign} alt="treble clef sign"></img>}
          {this.props.staff === 'bass' && <img id="bassclef" src={bassClefSign} alt="bass clef sign"></img>}
          {this.props.staff === 'alto' && <img id="altoclef" src={altoClefSign} alt="alto clef sign"></img>}
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </section>
    )
  }
}

export default Staff
