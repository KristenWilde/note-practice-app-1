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
        pitches: ['f4t00', 'a4t02', 'c5t04', 'e5t06'],
        targetProgress: 5000,
      },
      { title: 'Treble lines in 8 sec',
        pitches: ['e4t-1', 'g4t01', 'b4t03', 'd5t05', 'f5t07'],
        targetProgress: 8000,
      },
      { title: 'Primer book notes',
        pitches: ['a3b07', 'b3b08', 'd4t-2', 'e4t-1', 'f4t00'],
        targetProgress: 5550,
      },
      {
        title: 'Low notes',
        pitches: ['g2b-1', 'a2b00', 'b2b01', 'c2b02'],
        targetProgress: 2500,
      },
      {
        title: 'Viola beginning',
        pitches: ['d4a04', 'e4a05', 'f4a06', 'g4a07', 'a4a08', 'b4a09', 'c5a10', 'd5a11'],
        targetProgress: 3000,
      }
    ],
    currentGoalIdx: 0,
    started: false,
    paused: false,
    finished: false,
    resultSpeeds: null
  }
  // resultSpeeds: [{id: 'g3b-1', speed: 4352}, {id: 'a3b00', speed: 6764}]

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

  stopQuiz = (results) => {
    this.setState({ started: false, paused: true, resultSpeeds: results.speeds })
  }

  startOver = e => {
    this.setState({ paused: false, finished: false })
  }

  render() {
    const currentGoal = this.state.goals[this.state.currentGoalIdx]

    if (this.state.started) {
      return (
        <Quiz
          pitches={currentGoal.pitches}
          title={currentGoal.title}
          targetProgress={currentGoal.targetProgress}
          stopQuiz={this.stopQuiz}
        />
      )
    }

    if (this.state.paused || this.state.finished) {
      return (
        <div>
          <MenuBar userId={this.props.match.params.userId}/>
          <main>
            <p>Here are the results of your practice:</p>
            <ul>
              {this.state.resultSpeeds.map(result => {
                return <li key={result.id}>{result.id.slice(0,2)}: {(result.speed/1000).toFixed(2)} seconds</li>
              })}
            </ul>
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
          <PickGoal goals={this.state.goals} selectGoal={this.selectGoal} currentGoalIdx={this.state.currentGoalIdx}/>
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
