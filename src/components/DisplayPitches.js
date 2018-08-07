import React from 'react'
import PropTypes from 'prop-types';
import '../css/staffnotes.css'

/* How this component will be used:
  <li>In Practice, it will show the pitches that are part of currentGoal (small).</li>
  <li>In Progress, it will show the pitches that are part of all goals, under 'By note' (large).
   When one is clicked, set state so that progress for that note will be shown below this component.</li>
  <li>Also in Progress, when a goal is selected, this display will be shown below the goal.
   Notes that have met the target will be highlighted. (small)</li>
  <li>In SetGoal, it will show all pitches (treble and bass staffs and ledger lines as selected).
   When one is clicked, it will appear 'disabled' and will not be included in the goal. (large)</li>*/

class DisplayPitches extends React.Component {
  // props: notes with status (word 'selected or empty string) and position (number),
  //        staff ('treble' or 'bass'),
  //        selectPitch function - takes (pitch, staff)

  render() {
    if (this.props.pitches) {
      const pitches = this.props.pitches
    } else {
      const pitches = {'a4t': {status: '', position: 3}, 'b4t': {status: '', position: 4} }
    }

    return (
      <div id="staff">
        <p>Current pitches are:</p>
        {Object.keys(this.props.pitches).map( pitch => {
          return (
            <div
              className={`note ${pitch} ${this.props.pitches[pitch].status}`}
              style={{bottom: `${this.props.pitches[pitch].position}em`}}
              onClick={() => this.props.selectPitch(pitch, this.props.staff)}
              key={pitch}
              data-name={pitch}
            >
              {pitch}
            </div>
          )
        })}
      </div>
    )
  }
}

export default DisplayPitches
