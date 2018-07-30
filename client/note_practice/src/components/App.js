import React, { Component } from 'react';
import MenuBar from './MenuBar'
import SetGoal from './SetGoal'
import Practice from './Practice'

class App extends Component {
  state = {
    currentGoal: null,
    firstname: '',
    goals: [],
  }
  render() {
    if (this.state.goals.length === 0) {
      return (
        <div>
          <MenuBar />
          <SetGoal goals={this.state.goals} name={this.state.firstname}/>
        </div>
      )
    } else {
      return (
        <div>
          <MenuBar />
          <Practice goals={this.state.goals} name={this.state.goals}/>
        </div>
      )
    }
  }
}

export default App;
