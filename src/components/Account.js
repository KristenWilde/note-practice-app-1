import React from 'react'
import PropTypes from 'prop-types'
import MenuBar from './MenuBar'
import {sampleUserId} from '../token'
import { getUser, getGoals } from '../api-helpers.js'
import PickGoal from './PickGoal'
import DisplayGoal from './DisplayGoal'

class Account extends React.Component {
  state = {
    user: null,
    goals: null,
    currentGoalIdx: 0,
  }

  componentDidMount() {
    const user = getUser(sampleUserId)
    const goals = getGoals(sampleUserId)
    this.setState({ user, goals })
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
            deleteGoal={this.deleteGoal}
          />
          <DisplayGoal goal={this.state.goals[this.state.currentGoalIdx]}/>
        </main>
      </div>
    )
  }
}

export default Account
