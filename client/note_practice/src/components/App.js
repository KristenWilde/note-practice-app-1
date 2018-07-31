import React, { Component } from 'react';
import MenuBar from './MenuBar'
import SetGoal from './SetGoal'
import Practice from './Practice'

class App extends Component {
  state = {
    firstname: 'Ayati',
    goals: [
      { title: 'Treble notes in 5 sec' },
      { title: 'Treble lines in 8 sec' }
    ],
    currentGoal: null,
    // Temporarily setting state for development
  }
  render() {
    const userId = this.props.match.params.userId;

    if (this.state.goals.length === 0) {
      return (
        <div>
          <MenuBar userId={userId}/>
          <SetGoal goals={this.state.goals} name={this.state.firstname}/>
        </div>
      )
    } else {
      return (
        <div>
          <MenuBar userId={userId}/>
          <Practice goals={this.state.goals} name={this.state.firstname}/>
        </div>
      )
    }
  }
}

export default App;
