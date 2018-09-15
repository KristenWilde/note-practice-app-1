import React from 'react'

class Intro extends React.Component {
  showRegistration(){
    this.props.history.push('/register')
  }

  render() {
    const data = { username: 'Kristen@myNotePractice.com', password: 'password'}

    return (
      <div>
        <h1>Welcome to MyNotePractice!</h1>
        <p>You've found the best tool on the web for practicing musical note identification!</p>
        <ul>
          <li>Set your own goals with the notes you want to learn.</li>
          <li>Choose from treble, bass, and alto clef.</li>
          <li>See charts showing your progress.</li>
          <li>Free, safe, and fun for all ages.</li>
        </ul>
        <button className="go" onClick={this.showRegistration}>Sign up</button>

      {/* Add inputs for username and password. */}

        <button className="go" onClick={e => this.props.logIn(data)}>Log in </button>
      </div>
    )
  }
}

export default Intro
