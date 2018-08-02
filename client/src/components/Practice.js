import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MenuBar from './MenuBar'
import SetGoal from './SetGoal'
import PickGoal from './PickGoal'
import Quiz from './Quiz'
import DisplayPitches from './DisplayPitches'

class Practice extends Component {
  state = {
    goals: [
      { title: 'Treble spaces in 5 sec',
        pitches: ['f4t', 'a4t', 'c5t', 'e5t'],
        targetProgress: 5000,
      },
      { title: 'Treble lines in 8 sec',
        pitches: ['e4t', 'g4t', 'b4t', 'd5t', 'f5t'],
        targetProgress: 8000,
      }
    ],
    currentGoal: {
      title: 'Treble notes in 5 sec',
      pitches: ['f4t', 'a4t', 'c5t', 'e5t'],
      targetProgress: 5000,
    },
    started: false,
  }
  // temporarily defining state for development

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          sampleResult: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  selectGoal = e => {
    const goalTitle = e.target.innerText;
    const goal = this.state.goals.filter(goal => {
      return goal.title === goalTitle
    })[0]
    localStorage.setItem('currentGoal', goal)
    this.setState({ currentGoal: goal })
  }

  startQuiz = e => {
    this.setState({ started: true })
  }

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    }

    if (!this.state.isLoaded) {
      return (
        <div>
          <MenuBar userId={this.props.match.params.userId}/>
          <main>Loading...</main>
        </div>
      )
    }

    if (this.state.started) {
      return <Quiz currentGoal={this.state.currentGoal}/>
    }

    return (
      <div>
        <MenuBar userId={this.props.match.params.userId}/>
        <main>
          <h1>Practice</h1>
          <p>Select a goal to start practicing.</p>
          <p><Link to={'/' + this.props.match.params.userId + '/goal/new'}>Set a new goal</Link></p>
          <PickGoal goals={this.state.goals} selectGoal={this.selectGoal} currentGoal={this.state.currentGoal}/>
          <DisplayPitches pitches={this.state.currentGoal.pitches}/>
          <p>Target: { this.state.currentGoal.targetProgress/1000 } seconds per note</p>
          <button className="go" onClick={this.startQuiz}>Start</button>
        </main>
      </div>
    )
  }
}

export default Practice
