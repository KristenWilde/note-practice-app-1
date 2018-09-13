import React, { Component } from "react";
import { Link } from "react-router-dom";
import Register from './Register'
import token from '../token'

class Home extends Component {
  state = {
    status: 'intro', // possible values are 'intro', 'register', 'login'
  }

  showRegistration = e => {
    this.setState({ status: 'register' })
  }

  showLogin = e => {
    this.setState({ status: 'login' })
  }

  render() {
    const welcome = <h1>Welcome to MyNotePractice!</h1>

    if (this.state.status === 'intro'){
      return (
        <main>
          {welcome}
          <div className="intro">
            <p>You've found the best tool on the web for practicing musical note identification!</p>
            <ul>
              <li>Set your own goals with the notes you want to learn.</li>
              <li>Choose from treble, bass, and alto clef.</li>
              <li>See charts showing your progress.</li>
              <li>Free, safe, and fun for all ages.</li>
            </ul>
            <button className="go" onClick={this.showRegistration}>Sign up</button>
            <button className="go" onClick={this.showLogin}>Log in </button>
          </div>
        </main>
      )
    }

    if (this.state.status === 'register') {
      return (
        <main>
          {welcome}
          <Register />
        </main>
      )
    }

    if (this.state.status === 'login') {
      return (
        <main>
          {welcome}
          <h1>Log in</h1>
        </main>
      )
    }

  }
}

export default Home;
