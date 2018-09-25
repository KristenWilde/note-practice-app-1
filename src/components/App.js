import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MenuBar from './MenuBar'
import Intro from './Intro'
import GoalIdx from './GoalIdx'
import SetGoal from './SetGoal'
import Progress from './Progress'
import Buddies from './Buddies'
import Account from './Account'
import About from './About'
import Register from './Register'
import LogInForm from './LogInForm'
import { saveGoal, createUser, destroyGoal, authenticate, saveQuizResults } from '../api-helpers'

class App extends Component {
  state = {
    user: null,
    msg: "",
  }

  createUser = (userData) => {
    const user = createUser(userData)
    if (user.userId) {
      this.setState({ user })
    } else {
      this.setState({ msg: 'Could not create user.'})
    }
  }

  logIn = (credentials) => {
    const user = authenticate(credentials)
    if (user && user.userId) {
      this.setState({ user })
      return user.userId
    }
  }

  logOut = (e) => {
    this.setState({ user: null, msg: 'You have logged out.' })
  }

  saveGoal = (newGoal) => {
    const user = saveGoal(this.state.user.userId, newGoal)
    if (user && user.userId) {
      this.setState({ user })
    } else {
      this.setState({ msg: 'Could not save goal ' + newGoal.title })
    }
  }

  destroyGoal = (goalId) => {
    const user = destroyGoal(this.state.user.userId, goalId)
    if (user && user.userId) {
      this.setState({ user, msg: 'Goal was deleted.' })
    } else {
      this.setState({ msg: 'Could not delete goal.' })
    }
  }

  saveQuizResults = (goalId, results) => {
    const user = saveQuizResults(this.state.user.userId, goalId, results)
    if (user && user.userId) {
      this.setState({ user, msg: 'Results saved.' })
    } else {
      this.setState({msg: 'Could not save results.'})
    }
  }


  render() {

    return (
      <BrowserRouter>
      <div>
        <MenuBar userId={this.state.user ? this.state.user.userId : null} logOut={this.logOut} />
        <main>
          <Switch>
            <Route path="/user/:userId/goal/new"
              render={(props) => {
                if (this.state.user) {
                  return <SetGoal saveGoal={this.saveGoal} {...props}/>
                } else {
                  this.setState({msg: "You must log in."})
                  return <Intro logIn={this.logIn} {...props}/>
                }
              }}
            />
            <Route path="/user/:userId/account"
              render={(props) => {
                if (this.state.user) {
                  return <Account user={this.state.user} {...props}/>
                } else {
                  return <Intro logIn={this.logIn} {...props}/>
                }
              }}
            />
            <Route path="/user/:userId"
              render={(props) => {
                if (this.state.user) {
                  return (
                    <GoalIdx 
                      goals={this.state.user.goals} 
                      firstname={this.state.user.firstname} 
                      saveQuizResults={this.saveQuizResults}
                      destroyGoal={this.destroyGoal}
                      {...props}
                    />
                  )
                } else {
                  return <Intro logIn={this.logIn} {...props}/>
                }
              }}
            />
            <Route path='/about' component={About}/>
            <Route path="/login"  render={(props) => (
              <LogInForm logIn={this.logIn} {...props}/>
            )}/>
            <Route exact path="/" render={(props) => (
              <Intro logIn={this.logIn} createUser={this.createUser} {...props}/>
            )}/>
            <Route path="/register" component={Register} createUser={this.createUser}/>
            {/*<Route path='/:userId/buddies' component={Buddies}/>*/}
            <Route render={() => <h2>The page you requested is not found.</h2>} />
          </Switch>
        </main>
        </div>
      </BrowserRouter>
    )
  }

}

export default App;
