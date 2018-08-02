import React from 'react'
import PropTypes from 'prop-types'
import MenuBar from './MenuBar'

class Account extends React.Component {
  render() {
    return (
      <div>
        <MenuBar userId={this.props.match.params.userId}/>
        <main>
          This is the Account view. Here user can change his/her password.
        </main>
      </div>
    )
  }
}

export default Account
