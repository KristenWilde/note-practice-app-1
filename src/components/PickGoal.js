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

  handleChange(idx) {
    this.props.selectGoal(idx)
    // this.toggleListVisibility()
  }

  render() {
    return (
      <form id="goal-list">
        <h2>Goal:</h2>
        <ul ref={this.ulRef}>
        {this.props.goals.map( (goal, idx) => {
          return (
            <li className={idx == this.props.currentGoalIdx ? 'current' : ''} key={idx} >
            <label>
            <input
              type="radio"
              name="pick-goal"
              key={idx}
              onChange={e => this.handleChange(idx)}
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
