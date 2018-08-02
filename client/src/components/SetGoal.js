import React, { Component } from 'react';
import MenuBar from './MenuBar';

class SetGoal extends Component {
  render() {
    return (
      <div>
        <MenuBar userId={this.props.match.params.userId}/>
        <main>
          <h1>Set a goal</h1>
        </main>
      </div>
    )
  }
}

export default SetGoal
