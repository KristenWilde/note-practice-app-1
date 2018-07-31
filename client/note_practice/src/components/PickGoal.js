import React from 'react'

class PickGoal extends React.Component {
  classForGoal(title) {
    console.log(this.props.currentGoal, title)
    if (this.props.currentGoal === title) {
      return 'selected';
    } else {
      return '';
    }
  }

  render() {
    return (
      <main>
        <h1>Practice</h1>
        <p>Select a goal to work on.</p>
        <ul onClick={this.props.selectGoal}>
        {this.props.goals.map( (goal, idx) => {
          return <li key={idx} className={this.classForGoal(goal.title)}>{goal.title}</li>
          })}
        </ul>
        <button className="continue">Start</button>
      </main>
    )
  }
}


export default PickGoal
