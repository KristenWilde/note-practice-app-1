import React from 'react'
import PropTypes from 'prop-types'
import MenuBar from './MenuBar'
import { sampleUserId } from '../token'
import { getUser } from '../api-helpers.js'


class Account extends React.Component {
  state = {
    userId: sampleUserId,
  }


  render() {
    return (
      <div>
        <MenuBar userId={this.props.match.params.userId}/>
        <main>
          <h1>Account</h1>
          <p>Here is your account info.</p>
        </main>
      </div>
    )
  }
}

export default Account
