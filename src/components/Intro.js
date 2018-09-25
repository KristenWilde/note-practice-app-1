import React from 'react'
import LogInForm from './LogInForm'
import Register from './Register'
import About from './About'
import Tab from './Tab'

function Intro(props) {
  function showRegistration(){
    props.history.push('/register')
  }
  
  const info = (
    <div>
      <p className="info">You've found the best tool on the web for practicing musical note identification!</p>
      <ul>
        <li>Set your own goals with the notes you want to learn.</li>
        <li>See your progress over time.</li>
      </ul>
    </div>
  )

    return (
      <div id="welcome">
        <h1>Welcome to MyNotePractice!</h1>
        { info }
        <button className="go" onClick={showRegistration}>Sign up</button>
        <p>Already have an account?</p>
        <LogInForm logIn={props.logIn} {...props}/>
      </div>
    )
}

export default Intro
