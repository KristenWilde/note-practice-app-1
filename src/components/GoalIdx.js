import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MenuBar from './MenuBar'
import SetGoal from './SetGoal'
import PickGoal from './PickGoal'
import DisplayGoal from './DisplayGoal'
import Quiz from './Quiz'
import DisplayPitches from './DisplayPitches'
import GoalProgress from './GoalProgress'
import token, { sampleUserId } from '../token'
// import { saveQuizResults, getUser, getGoals, destroyGoal, baseUrl } from '../api-helpers'
import { selectGoal } from '../misc-helpers'

class Practice extends Component {
  selectGoal = selectGoal.bind(this)

  state = {
    // goals: [
    //   { title: 'Treble spaces in 5 sec',
    //     pitches: ['f4t00', 'a4t02', 'c5t04', 'e5t06'],
    //     targetProgress: 5000,
    //     goalId: '32452345246',
    //     current: true,
    //   },
    //   { title: 'Treble lines in 8 sec',
    //     pitches: ['e4t-1', 'g4t01', 'b4t03', 'd5t05', 'f5t07'],
    //     targetProgress: 8000,
    //   },
    //   { title: 'Primer book notes',
    //     pitches: ['a3b07', 'b3b08', 'd4t-2', 'e4t-1', 'f4t00'],
    //     targetProgress: 5550,
    //   },
    //   {
    //     title: 'Low notes',
    //     pitches: ['g2b-1', 'a2b00', 'b2b01', 'c2b02'],
    //     targetProgress: 2500,
    //   },
    //   {
    //     title: 'Viola beginning',
    //     pitches: ['d4a04', 'e4a05', 'f4a06', 'g4a07', 'a4a08', 'b4a09', 'c5a10', 'd5a11'],
    //     targetProgress: 3000,
    //   }
    // ],
    currentGoalIdx: 0,
    started: false,
    paused: false,
    finished: false,
    resultSpeeds: null
  }

  componentDidMount() {
    // this.setState({ user })
    // this.logGoals()
  }

  startQuiz = e => {
    this.setState({ started: true })
  }

  stopQuiz = (results) => {
    const goalId = this.props.goals[this.state.currentGoalIdx].goalId
    // console.log('goalId is ', goalId)
    this.props.saveQuizResults(results, this.props.match.params.userId, goalId)
    this.setState({ started: false, paused: true, resultSpeeds: results.pitches })
  }

  startOver = e => {
    this.setState({ paused: false, finished: false })
  }

  deleteGoal = async () => {
    // const confirmation = Window.confirm(`Press 'OK' to permanently delete "${title}". This cannot be undone!`)
    // if (confirmation) {
      const goalId = this.props.goals[this.state.currentGoalIdx].goalId
      console.log('Deleting '+ goalId)
      this.props.destroyGoal(this.props.match.params.userId, goalId)
      this.setState({ currentGoalIdx: 0 })
    // }
  }

  render() {
    const currentGoal = this.props.goals[this.state.currentGoalIdx]

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
            {/*<ul>
              {this.state.resultSpeeds.map(result => {
                return <li key={result.id}>{result.id.slice(0,2)}: {(result.speed/1000).toFixed(2)} seconds</li>
              })}
            </ul>*/}
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
          <h1>{}'s Goals</h1>
          <PickGoal goals={this.props.goals} selectGoal={this.selectGoal} currentGoalIdx={this.state.currentGoalIdx}/>
          <DisplayGoal goal={currentGoal}/>
          <GoalProgress goal={currentGoal}/>
          <button className="go" onClick={this.startQuiz}>Start</button>
          <Link to={'/' + this.props.match.params.userId + '/goal/new'}>Set a new goal</Link>
          <p><a href="#" onClick={this.deleteGoal}>Permanently delete the selected goal</a></p>
        </main>
      </div>
    )
  }
}

export default Practice
