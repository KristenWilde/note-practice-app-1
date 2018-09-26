import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MenuBar from './MenuBar'
import SetGoal from './SetGoal'
import PickGoal from './PickGoal'
// import DisplayGoal from './DisplayGoal'
import Quiz from './Quiz'
import DisplayPitches from './DisplayPitches'
import GoalProgress from './GoalProgress'

class GoalIdx extends Component {
  // Props: 
  //  goals, 
  // firstname, 
  // saveQuizResults - function()

  state = {
    currentGoalIdx: 0,
    started: false,
  }

  selectGoal = (idx) => {
    this.setState({ currentGoalIdx: idx })
  }

  startQuiz = e => {
    this.setState({ started: true })
  }

  stopQuiz = (noteScores) => {
    const goalId = this.props.goals[this.state.currentGoalIdx].goalId
    this.props.saveQuizResults(goalId, noteScores)
    this.setState({ started: false })
  }

  render() {
    const currentGoal = this.props.goals[this.state.currentGoalIdx]

    if (this.state.started) {
      return (
        <Quiz
          pitchIds={currentGoal.pitchIds}
          title={currentGoal.title}
          targetProgress={currentGoal.targetProgress}
          stopQuiz={this.stopQuiz}
        />
      )
    }

    return (
      <div>
          <h1>{this.props.firstname}'s Goals</h1>
          <PickGoal 
            goals={this.props.goals} 
            selectGoal={this.selectGoal} 
            currentGoalIdx={this.state.currentGoalIdx}
            userId={this.props.match.params.userId}
          />
          
          <DisplayPitches noteIds={currentGoal.pitchIds}/>
          <GoalProgress goal={currentGoal}/>
          <p>Target: { Number(currentGoal.targetProgress)/1000 } seconds per note</p>
          <button className="go" onClick={this.startQuiz}>Start</button>
          <Link to={'/user/' + this.props.match.params.userId + '/goal/new'}>Set a new goal</Link>
          <p>
            <a href="#" onClick={() => this.props.destroyGoal(currentGoal.goalId)}>
              Permanently delete this goal (<em>{currentGoal.title}</em>)
            </a>
          </p>
      </div>
    )
  }
}

export default GoalIdx
