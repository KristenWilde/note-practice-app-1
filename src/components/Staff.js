import React from 'react'
import PropTypes from 'prop-types';
import '../css/staffnotes.css'
import bassClefSign from '../images/bassclef.png'
import trebleClefSign from '../images/trebleclef.png'

/* How this component will be used:
  <li>In Practice, it will show the pitches that are part of currentGoal (small).</li>
  <li>In Progress, it will show the pitches that are part of all goals, under 'By note' (large).
   When one is clicked, set state so that progress for that note will be shown below this component.</li>
  <li>Also in Progress, when a goal is selected, this display will be shown below the goal.
   Notes that have met the target will be highlighted. (small)</li>
  <li>In SetGoal, it will show all pitches (treble and bass staffs and ledger lines as selected).
   When one is clicked, it will appear 'disabled' and will not be included in the goal. (large)</li>*/

class Staff extends React.Component {
  // props: notes with status (word 'selected or empty string) and position (number),
  //        staff ('treble' or 'bass'),
  //        selectPitch function - takes (pitch, staff)
  left(position) {
    return `${Math.abs(position % 2) * 5 + 9}em`
  }

  bottom(position) {
    const offset = 4
    return `${position + offset}em`
  }

  ledgerLine(position) {
    if (position >= 0 && position <= 9) { return null }
    if (position % 2 === 0) { return <div className="ledger line-through"></div> }
    if (position % 2 === 1 || position % 2 === -1) { return <div className="ledger line-below"></div> }
  }

  render() {
    if (this.props.pitches) {
      const pitches = this.props.pitches
    } else {
      const pitches = {'a4t': {status: '', position: 3}, 'b4t': {status: '', position: 4} }
    }

    const htmlLines = <div className="lines">
      {this.props.staff === 'treble' && <img id="trebleclef" src={trebleClefSign} alt="treble clef sign"></img>}
      {this.props.staff === 'bass' && <img id="bassclef" src={bassClefSign} alt="bass clef sign"></img>}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    return (
      <div id="staff" style={{}}>
        {htmlLines}
        {Object.keys(this.props.pitches).map( pitch => {
          const { position, status } = this.props.pitches[pitch]
          return (
            <div
              className={`note ${pitch} ${status}`}
              style={{bottom: this.bottom(position), left: this.left(position)}}
              onClick={() => this.props.selectPitch(pitch, this.props.staff)}
              key={pitch}
            >
              {pitch[0].toUpperCase()}
              {this.ledgerLine(position)}
            </div>

          )
        })}
      </div>
    )
  }
}

export default Staff
