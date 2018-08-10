import React from 'react'
import PropTypes from 'prop-types'
import '../css/staffnotes.css'
import bassClefSign from '../images/bassclef.png'
import trebleClefSign from '../images/trebleclef.png'
import Note from './Note'

/* How this component will be used:
  <li>In Practice, it will show the pitches that are part of currentGoal (small).</li>
  <li>In Progress, it will show the pitches that are part of all goals, under 'By note' (large).
   When one is clicked, set state so that progress for that note will be shown below this component.</li>
  <li>Also in Progress, when a goal is selected, this display will be shown below the goal.
   Notes that have met the target will be highlighted. (small)</li>
  <li>In SetGoal, it will show all pitches (treble and bass staffs and ledger lines as selected).
   When one is clicked, it will appear 'disabled' and will not be included in the goal. (large)</li>*/

class Staff extends React.Component {
  // props: pitchObj: an object where keys are noteId's, values are object {status: (word 'selected or empty string), position: (number)}
  //        staff ('treble' or 'bass'),
  //        selectPitch function - takes (pitch, staff). Optional.

  render() {

    return (
      <section className="staff-wrapper">
        <div className="staff-lines">
          {Object.keys(this.props.pitchObj).map( pitch => {
            const { position, status } = this.props.pitchObj[pitch]
            return (
              <Note
                id={pitch}
                position={position}
                status={status}
                selectPitch={this.props.selectPitch}
                staff={this.props.staff}
                key={pitch}
                />
              )
          })}
          {this.props.staff === 'treble' && <img id="trebleclef" src={trebleClefSign} alt="treble clef sign"></img>}
          {this.props.staff === 'bass' && <img id="bassclef" src={bassClefSign} alt="bass clef sign"></img>}
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
