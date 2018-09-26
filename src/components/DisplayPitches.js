import React from 'react'
// import PropTypes from 'prop-types';
import Staff from './Staff'
import { staffNotesObj, pitchIdsForStaff, staffLinesTop, staffWrapperHeight } from '../music.js'


function DisplayPitches(props) {
  // props: noteIds: array of pitch id's.
  // This component will display Staff components by mapping to trebleData, bassData.
  // Staff components need: note object, staff.

  const trebleNotesObj = staffNotesObj(props.noteIds, 'treble')
  const bassNotesObj = staffNotesObj(props.noteIds, 'bass')
  const altoNotesObj = staffNotesObj(props.noteIds, 'alto')
  const trebleIds = pitchIdsForStaff(props.noteIds, 'treble')
  const bassIds = pitchIdsForStaff(props.noteIds, 'bass')
  const altoIds = pitchIdsForStaff(props.noteIds, 'alto')

  if (altoNotesObj) {
    return (
      <Staff
        staff="alto"
        pitchObj={altoNotesObj}
        top={staffLinesTop(altoIds)}
        height={staffWrapperHeight(altoIds)}
      />
    )
  }

  return(
    <div>
      {trebleNotesObj &&
        <Staff
          staff="treble"
          pitchesObj={trebleNotesObj}
          top={staffLinesTop(trebleIds)}
          height={staffWrapperHeight(trebleIds)}
          />}
      {bassNotesObj &&
        <Staff
        staff="bass"
        pitchesObj={bassNotesObj}
        top={staffLinesTop(bassIds)}
        height={staffWrapperHeight(bassIds)}
        />}
    </div>
  )
}

export default DisplayPitches
