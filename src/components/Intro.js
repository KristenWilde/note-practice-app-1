import React from 'react'
import LogInForm from './LogInForm'

class Intro extends React.Component {
  showRegistration(){
    this.props.history.push('/register')
  }

  render() {
    const info = (
      <div id="welcome-info">
        <p>You've found the best tool on the web for practicing musical note identification!</p>
        <ul>
          <li>Set your own goals with the notes you want to learn.</li>
          <li>See your progress over time.</li>
        </ul>
      </div>
    )

    return (
      <div>
        <h1>Welcome to MyNotePractice!</h1>
        { info }
        <LogInForm logIn={this.props.logIn} {...this.props}/>
        <button className="go" onClick={this.showRegistration}>Sign up</button>
      </div>
    )
  }
}

export default Intro
