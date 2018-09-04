import React from 'react'
import PropTypes from 'prop-types'
import MenuBar from './MenuBar'
import {sampleUserId} from '../token'
import { getUser, getGoals, destroyGoal } from '../api-helpers.js'
import PickGoal from './PickGoal'
import DisplayGoal from './DisplayGoal'

class Account extends React.Component {
  state = {
    userId: sampleUserId,
    user: {},
    goals: [{title: "", targetProgress: "", goalId: "", pitches: []}],
    currentGoalIdx: 0,
  }

  componentDidMount = async function() {
    const user = await getUser(sampleUserId)
    const goals = getGoals(user)
    this.setState({ user, goals })
  }

  deleteGoal = async (goalId, title) => {
    // const confirmation = Window.confirm(`Press 'OK' to permanently delete "${title}". This cannot be undone.`)
    // if (confirmation) {
      console.log(goalId, title)
      const user = await destroyGoal(this.state.userId, goalId)
      const goals = getGoals(user)
      this.setState({ user, goals })
    // }
  }

  selectGoal = idx => {
    const goals = this.state.goals.slice()
    for (let goal of goals) {
      goal.current = false
    }
    goals[idx].current = true
    this.setState({ goals, currentGoalIdx: idx })
  }

  render() {
    return (
      <div>
        <MenuBar userId={this.props.match.params.userId}/>
        <main>
          <h1>Account</h1>
          <p>Here is your account info. You may update your personal information or delete goals.</p>
          <form action="">
          <h2>Personal information</h2>
          </form>
          <h2>Goals</h2>
          <PickGoal
            goals={this.state.goals}
            selectGoal={this.selectGoal}
            currentGoalIdx={this.state.currentGoalIdx}
          />
          <DisplayGoal goal={this.state.goals[this.state.currentGoalIdx]} deleteGoal={this.deleteGoal}/>
        </main>
      </div>
    )
  }
}

export default Account
