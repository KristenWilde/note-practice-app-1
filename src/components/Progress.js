import React from 'react'
import PropTypes from 'prop-types'
import MenuBar from './MenuBar'

class Progress extends React.Component {
  render() {
    return (
      <div>
        <MenuBar userId={this.props.match.params.userId}/>
        <main>This is where the user can see his/her progress.</main>

      </div>
    )
  }
}

export default Progress
