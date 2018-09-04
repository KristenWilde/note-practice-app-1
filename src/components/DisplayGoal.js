import React from 'react'
// import PropTypes from 'prop-types'
import DisplayPitches from './DisplayPitches'

class DisplayGoal extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.goal.title}</h3>
        {this.props.deleteGoal &&
          <button
            className="delete-goal"
            onClick={e => this.props.deleteGoal(this.props.goal.goalId, this.props.goal.title)}
            >Delete</button>
        }
        <p>Target: { this.props.goal.targetProgress/1000 } seconds per note</p>
        <DisplayPitches noteIds={this.props.goal.pitches}/>
      </div>
    )
  }
}

export default DisplayGoal
