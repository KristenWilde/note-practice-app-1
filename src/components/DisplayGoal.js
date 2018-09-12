import React from 'react'
// import PropTypes from 'prop-types'
import DisplayPitches from './DisplayPitches'

class DisplayGoal extends React.Component {
  render() {
    return (
      <div className="display-goal">
        <DisplayPitches noteIds={this.props.goal.pitches}/>
        <p>Target: { this.props.goal.targetProgress/1000 } seconds per note</p>
      </div>
    )
  }
}

export default DisplayGoal
