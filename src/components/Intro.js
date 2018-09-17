import React from 'react'
import LogInForm from './LogInForm'

class Intro extends React.Component {
  showRegistration(){
    this.props.history.push('/register')
  }

  render() {
    const info = (
      <div>
        <p>You've found the best tool on the web for practicing musical note identification!</p>
        <ul>
          <li>Set your own goals with the notes you want to learn.</li>
          <li>See charts showing your progress.</li>
          <li>Free, safe, and fun for all ages.</li>
        </ul>
      </div>
    )

    return (
      <div>
        <h1>Welcome to MyNotePractice!</h1>
        { info }
        <p className="msg">{this.props.msg}</p>
        <LogInForm logIn={this.props.logIn} />
        <button className="go" onClick={this.showRegistration}>Sign up</button>
      </div>
    )
  }
}

export default Intro
