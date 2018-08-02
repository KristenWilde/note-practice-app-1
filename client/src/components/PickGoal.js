import React from 'react'

class PickGoal extends React.Component {

  classForGoal(title) {
    console.log(this.props.currentGoal, title)
    if (this.props.currentGoal.title === title) {
      return 'selected';
    } else {
      return '';
    }
  }

  render() {
    return (
      <ul onClick={this.props.selectGoal}>
        {this.props.goals.map( (goal, idx) => {
          return (
            <li key={idx} className={this.classForGoal(goal.title)}>
              {goal.title}
            </li>
          )
        })}
      </ul>
    )
  }
}


export default PickGoal
