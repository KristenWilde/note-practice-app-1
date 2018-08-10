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
        current: true,
      },
      { title: 'Treble lines in 8 sec',
        pitches: ['e4t', 'g4t', 'b4t', 'd5t', 'f5t'],
        targetProgress: 8000,
        current: false,
      },
      { title: 'Primer book notes',
        pitches: ['a3b', 'b3b', 'd4t', 'e4t', 'f4t'],
        targetProgress: 5550,
        current: false,
      },
      {
        title: 'Low notes',
        pitches: ['g2b', 'a2b', 'b2b', 'c2b'],
        targetProgress: 2500,
        current: false,
      }
    ],
    currentGoalIdx: 0,
    started: false,
    paused: false,
    finished: false
  }
  // temporarily defining state above for development

  componentDidMount() {
    // Will fetch goal data from our api and set state.
  }

  selectGoal = idx => {
    const goals = this.state.goals.slice()
    console.log(goals)
    for (let goal of goals) {
      goal.current = false
    }
    console.log(goals)
    goals[idx].current = true
    this.setState({ goals, currentGoalIdx: idx })
  }

  startQuiz = e => {
    this.setState({ started: true })
  }

  stopQuiz = e => {
    this.setState({ started: false, paused: true })
  }

  startOver = e => {
    this.setState({ paused: false, finished: false })
  }

  render() {
    const currentGoal = this.state.goals[this.state.currentGoalIdx]

    if (this.state.started) {
      return <Quiz currentGoal={currentGoal} stopQuiz={this.stopQuiz}/>
    }

    if (this.state.paused || this.state.finished) {
      return (
        <div>
          <MenuBar userId={this.props.match.params.userId}/>
          <main>
            <p>Here are the results of your practice:</p>
            <button className="go" onClick={this.startQuiz}>Keep practicing</button>
            <button className="go" onClick={this.startOver}>Pick another goal</button>
          </main>
        </div>
      )
    }

    return (
      <div>
        <MenuBar userId={this.props.match.params.userId}/>
        <main>
          <h1>Practice</h1>
          <p>Select a goal below to start practicing
          (or <Link to={'/' + this.props.match.params.userId + '/goal/new'}>set a new goal</Link>).
          </p>
          <PickGoal goals={this.state.goals} selectGoal={this.selectGoal} currentGoal={currentGoal}/>
          <h3>{currentGoal.title}</h3>
          <DisplayPitches noteIds={currentGoal.pitches}/>
          <p>Target: { currentGoal.targetProgress/1000 } seconds per note</p>
          <button className="go" onClick={this.startQuiz}>Start</button>
        </main>
      </div>
    )
  }
}

export default Practice
