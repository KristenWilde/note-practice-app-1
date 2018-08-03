import React from 'react'
import PropTypes from 'prop-types';

/* How this component will be used:
  <li>In Practice, it will show the pitches that are part of currentGoal (small).</li>
  <li>In Progress, it will show the pitches that are part of all goals, under 'By note' (large).
   When one is clicked, set state so that progress for that note will be shown below this component.</li>
  <li>Also in Progress, when a goal is selected, this display will be shown below the goal.
   Notes that have met the target will be highlighted. (small)</li>
  <li>In SetGoal, it will show all pitches (treble and bass staffs and ledger lines as selected).
   When one is clicked, it will appear 'disabled' and will not be included in the goal. (large)</li>*/

class DisplayPitches extends React.Component {

  render() {
    if (this.props.pitches) {
      const pitches = this.props.pitches
    } else {
      const pitches = ['a4t', 'b4t', 'c5t', 'd5t']
    }

    return (
      <div id="display-pitches">
        <p>Current pitches are {this.props.pitches.join(', ')}</p>
      </div>
    )
  }
}

export default DisplayPitches
