import React from 'react'
import PropTypes from 'prop-types';
import Staff from './Staff'
import { staffNotesObj } from '../music.js'

/* How this component will be used:
  <li>In Practice, it will show the pitches that are part of currentGoal (small).</li>
  <li>In Progress, it will show the pitches that are part of all goals, under 'By note' (large).
   When one is clicked, set state so that progress for that note will be shown below this component.</li>
  <li>Also in Progress, when a goal is selected, this display will be shown below the goal.
   Notes that have met the target will be highlighted. (small)</li>
   */

class DisplayPitches extends React.Component {
  // props: noteIds: array of pitch id's
  // This component will display Staff components by mapping to trebleData, bassData.
  // Staff components need: note object, staff.


  render() {
    const trebleNotesObj = staffNotesObj(this.props.noteIds, 'treble')
    const bassNotesObj = staffNotesObj(this.props.noteIds, 'bass')
    const altoNotesObj = staffNotesObj(this.props.noteIds, 'alto')

    if (altoNotesObj) {
      return <Staff staff="alto" pitchObj={altoNotesObj}/>
    }

    return(
      <div>
        {trebleNotesObj && <Staff staff="treble" pitchesObj={trebleNotesObj}/>}
        {bassNotesObj && <Staff staff="bass" pitchesObj={bassNotesObj}/>}
        {altoNotesObj && <Staff staff="alto" pitchesObj={altoNotesObj}/>}
      </div>
    )
  }
}

export default DisplayPitches
