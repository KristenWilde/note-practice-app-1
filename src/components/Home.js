import React, { Component } from "react";
import { Link } from "react-router-dom";
import token from '../token'

class Home extends Component {
  menuItems = {
    Practice: `/${this.props.userId}/practice`,
    "Set a Goal": `/${this.props.userId}/goal/new`,
    "View Progress": `/${this.props.userId}/progress`,
    "Music Buddies": `/${this.props.userId}/buddies`,
    FAQ: "/faq",
    "My Account": `/${this.props.userId}/account`
  };

  getUsers() {
    const url = "http://musical-app.herokuapp.com/global"
    const myHeaders = new Headers()
    myHeaders.append('token', token)

    fetch(url, { method: 'GET', headers: myHeaders })
    .then(result => result.json())
    .then(result => console.log(result), err => console.log(err))
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {
    return (
      <main>
        <h1>This is the Home page.</h1>
        <p>The react version is {React.version}</p>
        <p>This is where user will log in or register.</p>
        <p>Other pages available:</p>
        <ul>
          {Object.keys(this.menuItems).map(item => (
            <li key={item}>
              <Link to={this.menuItems[item]}>{item}</Link>
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

export default Home;
