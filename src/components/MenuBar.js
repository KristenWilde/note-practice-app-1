import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../css/menubar.css'

class MenuBar extends React.Component {

  showMenu = event => {
    event.currentTarget.classList.toggle('opened')
  }

  render() {
    let menuItems
    if (this.props.userId) {
      menuItems = {
        'Set a Goal': `/${this.props.userId}/goal/new`,
        'My Goals': `/${this.props.userId}`,
        'Music Buddies': `/${this.props.userId}/buddies`,
        'About': '/about',
        'My Account': `/${this.props.userId}/account`,
      }
    } else {
      menuItems = {
        'Sign up': '/register',
        About: '/about',
        'Log in': '/login',
      }
    }

    return (
      <header className="main">
        <h1>MyNotePractice</h1>
        <nav>
          <button id="nav-toggle" onClick={this.showMenu}>
            <span />
          </button>
          <ul>
            {Object.keys(menuItems).map(item => (
              <li key={item}>
                <Link to={menuItems[item]}>{item}</Link>
              </li>
            ))}
            {this.props.userId && <li><a onClick={this.props.logOut}>Log out</a></li>}
          </ul>
        </nav>
      </header>
    )
  }
}

export default MenuBar
