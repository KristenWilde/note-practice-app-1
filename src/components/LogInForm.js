import React from 'react'

class LogInForm extends React.Component {
  state = {
    username: '',
    password: '',
  }

  setUsername = (e) => {
    this.setState({ username: e.target.value })
  }

  setPassword = (e) => {
    this.setState({ password: e.target.value })
  }

  submit = (e) => {
    this.props.logIn({ ...this.state })
  }

  render() {
    return (
      <div>
        <dl>
          <dt><label htmlFor="usernameInput">Username or email:</label></dt>
          <dd><input type="text" id="usernameInput" onChange={this.setUsername}/></dd>
          <dt><label htmlFor="passwordInput">Password:</label></dt>
          <dd><input type="password" id="passwordInput" onChange={this.setPassword}/></dd>
        </dl>
        <button className="go" onClick={this.submit}>Log in </button>
      </div>
    )
  }
}

export default LogInForm
