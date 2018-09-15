import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MenuBar from './MenuBar'
import Intro from './Intro'
import GoalIdx from './GoalIdx'
import SetGoal from './SetGoal'
import Progress from './Progress'
import Buddies from './Buddies'
import Account from './Account'
import FAQ from './FAQ'
import Register from './Register'
// import NotFound from './NotFound'
import { saveGoal, createUser, destroyGoal, logIn, saveQuizResults } from '../api-helpers'

class App extends Component {
  state = {
    user: null,
  }

  componentDidMount() {
    // If there is a session, get user info and set state.
  }

  createUser = (userData) => {
    const user = createUser(userData)
    this.setState({ user })
  }

  logIn = (credentials) => {
    // fetch user from api and set state.
    const user = logIn(credentials)
    this.setState({ user })
  }

  destroyGoal = (goalId, userId) => {
    const user = destroyGoal(goalId, userId)
    this.setState({ user })
  }

  render() {
    const userId = this.props.match.params.userId;

    return (
      <BrowserRouter>
        <MenuBar userId={userId}/>
        <main>
          <Switch>
            <Route exact path="/" component={Intro}/>
            <Route exact path="/register" render={() => <Register createUser={this.createUser}/>}/>
           {/* <Route exact path="/login" render={() => <LogIn logIn={this.logIn}/>} />*/}
            <Route path="/:userId" render={() => <GoalIdx user={this.state.user} />} />
            <Route path="/:userId/new-goal" render={() => <SetGoal saveGoal={this.saveGoal} />} />

            {/*<Route path='/:userId/buddies' component={Buddies}/>*/}
            <Route path='/:userId/account' render={() => <Account user={this.state.user} />} />
            <Route exact path='/faq' component={FAQ}/>
            {/*<Route component={NotFound} />*/}
          </Switch>
        </main>
      </BrowserRouter>
    )
  }

}

export default App;
