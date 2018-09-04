import React from 'react'
// import PropTypes from 'prop-types'
import DisplayPitches from './DisplayPitches'

class DisplayGoal extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.goal.title}</h3>
        <p>Target: { this.props.goal.targetProgress/1000 } seconds per note</p>
        <DisplayPitches noteIds={this.props.goal.pitches}/>
      </div>
    )
  }
}

export default DisplayGoal
