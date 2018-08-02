import React from 'react'
import MenuBar from './MenuBar'

class FAQ extends React.Component {
  render() {
    return (
      <div>
        <MenuBar userId={this.props.match.params.userId}/>
        <main>
          <h1>Questions?</h1>
          <p>Here we will explain why our app is so awesome for music learners.</p>
        </main>
      </div>
    )
  }
}

export default FAQ
