import React from 'react'
import PropTypes from 'prop-types';
import Staff from './Staff'
import { goalData } from '../music.js'

/* How this component will be used:
  <li>In Practice, it will show the pitches that are part of currentGoal (small).</li>
  <li>In Progress, it will show the pitches that are part of all goals, under 'By note' (large).
   When one is clicked, set state so that progress for that note will be shown below this component.</li>
  <li>Also in Progress, when a goal is selected, this display will be shown below the goal.
   Notes that have met the target will be highlighted. (small)</li>
   */

class DisplayPitches extends React.Component {
  // props: noteIds: array of pitch id's
  // This component will display Staff components by mapping to trebleData, bassData. (Staff components need: note data object,
  state = {
    trebleData: goalData(this.props.noteIds, 'treble'),
    bassData: goalData(this.props.noteIds, 'bass')
  }

  // Bug alert: state will not update based on props!

  // componentDidUpdate() {
  //   const trebleData = goalData(this.props.noteIds, 'treble')
  //   const bassData = goalData(this.props.noteIds, 'bass')
  //   this.setState({ trebleData, bassData })
  // }

  render() {
    return(
      <div>
        {this.state.trebleData && <Staff staff="treble" pitchObj={goalData(this.props.noteIds, 'treble')}/>}
        {this.state.bassData && <Staff staff="bass" pitchObj={goalData(this.props.noteIds, 'bass')}/>}
      </div>
    )
  }
}

export default DisplayPitches
