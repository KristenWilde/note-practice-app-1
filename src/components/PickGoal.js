import React from 'react'
import '../css/pickgoal.css'

class PickGoal extends React.Component {

  render() {
    return (
      <ul id="goal-list">
        {this.props.goals.map( (goal, idx) => {
          return (
            <li
              key={idx}
              className={idx == this.props.currentGoalIdx ? 'current' : ''}
              onClick={() => this.props.selectGoal(idx)}
            >
              {goal.title}
            </li>
          )
        })}
      </ul>
    )
  }
}


export default PickGoal
