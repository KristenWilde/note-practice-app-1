import React from 'react'
import PropTypes from 'prop-types'
import MenuBar from './MenuBar'

class Buddies extends React.Component {
  render() {
    return (
      <div>
        <MenuBar userId={this.props.match.params.userId}/>
        <main>
          This is the Buddies view. Here user can share their progress with other users.
        </main>
      </div>
    )
  }
}

export default Buddies
