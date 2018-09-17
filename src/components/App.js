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
import { saveGoal, createUser, destroyGoal, authenticate, saveQuizResults } from '../api-helpers'

class App extends Component {
  state = {
    user: null,
    msg: "",
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
    const user = authenticate(credentials)
    if (user) {
      this.setState({ user })
    } else {
      this.setState({ msg: 'Invalid username and/or password.'})
    }
  }

  destroyGoal = (goalId, userId) => {
    const user = destroyGoal(goalId, userId)
    this.setState({ user })
  }

  render() {

    return (
      <BrowserRouter>
      <div>
        <MenuBar userId={this.state.user ? this.state.user.userId : null}/>
        <main>
          <Switch>

            <Route exact path="/register" render={() => <Register createUser={this.createUser}/> } />
            {this.state.user && <Route path="/:userId" render={(props) => <GoalIdx {...props} goals={this.state.user.goals} firstname={this.state.user.firstname}/>} />}
            {this.state.user && <Route path="/:userId/goal/new" render={() => <SetGoal saveGoal={this.saveGoal} />} />}
            {this.state.user && <Route path='/:userId/account' render={() => <Account user={this.state.user} />} />}
            <Route exact path='/faq' component={FAQ}/>
            <Route path="/" render={() => <Intro logIn={this.logIn} msg={this.state.msg}/>}/>
            {/*<Route path='/:userId/buddies' component={Buddies}/>*/}
            {/*<Route component={NotFound} />*/}
          </Switch>
        </main>
        </div>
      </BrowserRouter>
    )
  }

}

export default App;
