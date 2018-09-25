import React from 'react'
import { Link } from 'react-dom'

class LogInForm extends React.Component {
  state = {
    username: '',
    password: '',
    message: '',
  }

  setUsername = (e) => {
    this.setState({ username: e.target.value })
  }

  setPassword = (e) => {
    this.setState({ password: e.target.value })
  }

  submit = (e) => {
    const username = this.state.username
    const password = this.state.password
    const userId = this.props.logIn({ username, password })
    if (userId) {
      this.props.history.push('/user/' + userId)
    } else {
      this.setState({ message: 'There is something wrong with your username or password.'})
    }
  }
  // First submit request to log in user.
  // On success, re-route to /:userId/goals.

  render() {
    return (
      <div>
        {this.state.message && <p className="alert">{this.state.message}</p>}
        <dl>
          <dt>
            <label htmlFor="usernameInput">Username or email:</label>
          </dt>
          <dd>
            <input type="text" id="usernameInput" onChange={this.setUsername}/>
          </dd>
          <dt>
            <label htmlFor="passwordInput">Password:</label>
          </dt>
          <dd>
            <input type="password" id="passwordInput" onChange={this.setPassword}/>
          </dd>
        </dl>
        <button className="go" onClick={this.submit}>Log in</button>
      </div>
    )
  }
}

export default LogInForm
