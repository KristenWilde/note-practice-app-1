import React, { Component } from 'react';

class Practice extends Component {
  render() {
    return (
      <div>
        <h1>Practice</h1>
        <p>Select a goal to work on.</p>
        <ul>
        {this.props.goals.map( (goal, idx) => {
          return <li key={idx}>{goal.title}</li>
          })}
        </ul>
        <button>Start</button>
      </div>
    )
  }
}

export default Practice
