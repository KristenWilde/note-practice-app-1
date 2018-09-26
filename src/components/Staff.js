import React from 'react'
// import PropTypes from 'prop-types'
import '../css/staffnotes.css'
import bassClefSign from '../images/bassclef.png'
import trebleClefSign from '../images/trebleclef.png'
import altoClefSign from '../images/altoclef.png'
import Note from './Note'
import { staffLinesTop, staffWrapperHeight } from '../music'

function Staff(props) {
  // props: pitchObj: an object where keys are noteId's, values are empty string or 'selected'
  //        staff ('treble' or 'bass'),
  //        selectPitch function - takes (pitch, staff). Optional.
  //        quizPitch: a note id for the current quiz pitch.
  //        quizPitchStatus: a string 'incorrect', 'correct', ''
  //        top: integer
  //        height: integer
  function quizNoteBelongs(){
    return props.quizPitchId[2] === props.staff[0]
  }

  let notes;
  let quizNote;

  if (props.pitchesObj) {
    notes = Object.keys(props.pitchesObj).map( noteId => {
      return <Note
                id={noteId}
                status={props.pitchesObj ? props.pitchesObj[noteId] : null}
                selectPitch={props.selectPitch}
                staff={props.staff}
                key={noteId}
              />
    })
  }

  if (props.quizPitchId && quizNoteBelongs()) {
    quizNote = <Note
                id={props.quizPitchId}
                status={props.pitchStatus}
                noteType='quiz-note'
                showNextPitch={props.showNextPitch}
                resetStatus={props.resetStatus}
              />
  }

  return (
    <section className="staff-wrapper" style={{height: props.height + 'em', fontSize: props.size + 'px'}}>
      <div className="staff-lines" style={{top: props.top + 'em'}}>
        {props.pitchesObj && notes}
        {props.quizPitchId && quizNote}
        {props.staff === 'treble' && <img id="trebleclef" src={trebleClefSign} alt="treble clef sign"></img>}
        {props.staff === 'bass' && <img id="bassclef" src={bassClefSign} alt="bass clef sign"></img>}
        {props.staff === 'alto' && <img id="altoclef" src={altoClefSign} alt="alto clef sign"></img>}
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </section>
  )
}

export default Staff
