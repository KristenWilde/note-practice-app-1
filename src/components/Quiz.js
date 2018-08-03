import React from 'react'
// import PropTypes from 'prop-types';
import '../css/quiz.css'

class Quiz extends React.Component {


  render() {
    const { title, pitches, targetProgress } = this.props.currentGoal

    return (
      <main>
        <p>You're practicing: <span className="title">{title}</span>.
          <a className="pause" onClick={this.props.stopQuiz}>Stop</a>
        </p>
      </main>
    )
  }
}

export default Quiz
