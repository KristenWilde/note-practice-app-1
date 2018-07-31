import React, { Component } from 'react';
import MenuBar from './MenuBar'
import SetGoal from './SetGoal'
import Practice from './Practice'

class App extends Component {
  state = {
    currentGoal: null,
    firstname: 'Ayati',
    goals: [
      { title: 'Treble notes in 5 sec' },
      { title: 'Treble lines in 8 sec' }
    ],
    // Temporarily setting state for development
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
          <Practice goals={this.state.goals} name={this.state.firstname}/>
        </div>
      )
    }
  }
}

export default App;
