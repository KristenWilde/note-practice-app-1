import React, { Component } from 'react';
import MenuBar from './MenuBar'
import SetGoal from './SetGoal'
import PickGoal from './PickGoal'

class Practice extends Component {
  state = {
    goals: [
      { title: 'Treble notes in 5 sec' },
      { title: 'Treble lines in 8 sec' }
    ],
    currentGoal: 'Treble notes in 5 sec',
  }
  // temporarily defining state for development

  selectGoal = e => {
    const goalTitle = e.target.innerText;
    localStorage.setItem('currentGoal', goalTitle)
    this.setState({ currentGoal: goalTitle })
  }

  render() {
    return (
      <div>
        <MenuBar userId={this.props.match.params.userId}/>
        <PickGoal goals={this.state.goals} selectGoal={this.selectGoal} currentGoal={this.state.currentGoal}/>
      </div>
    )
  }
}

export default Practice
