import React from 'react'
import PropTypes from 'prop-types'
import MenuBar from './MenuBar'
import token, {sampleUserId} from '../token'

class Account extends React.Component {

  getUser() {
    const url = "http://musical-app.herokuapp.com/" + sampleUserId
    const myHeaders = new Headers()
    myHeaders.append('token', token)

    fetch(url, { method: 'GET', headers: myHeaders })
    .then(result => result.json())
    .then(result => {
        console.log(result)

      }, err => console.log(err)
    )
  }

  componentDidMount() {
    this.getUser();
  }

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
