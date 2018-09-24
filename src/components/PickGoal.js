import React from 'react'
import '../css/pickgoal.css'

class PickGoal extends React.Component {
  //props: currentGoalIdx, goals, selectGoal
  constructor(props) {
    super(props);
    this.ulRef = React.createRef();
  }

  toggleListVisibility = () => {
    this.ulRef.current.classList.toggle('hidden')
  }

  render() {
    return (
      <form id="goal-list">
        <ul ref={this.ulRef} className="hidden">
        {this.props.goals.map( (goal, idx) => {
          return (
            <li className={idx == this.props.currentGoalIdx ? 'current' : ''} key={goal.goalId} >
              <label>
                <input
                  type="radio"
                  name="pick-goal"
                  onChange={e => this.props.selectGoal(idx)}
                  onClick={this.toggleListVisibility}
                  checked={idx == this.props.currentGoalIdx}
                />{goal.title}
              </label>
            </li>
          )
        })}
        </ul>
        <div className="showListButton" onClick={this.toggleListVisibility}>
          <span>⌃</span>
        </div>
      </form>
    )
  }
}


export default PickGoal
