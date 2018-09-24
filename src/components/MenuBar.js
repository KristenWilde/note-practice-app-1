import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import '../css/menubar.css'

class MenuBar extends React.Component {

  showMenu = event => {
    event.currentTarget.classList.toggle('opened')
  }

  render() {
    let menuItems
    if (this.props.userId) {
      menuItems = {
        'Set a Goal': `user/${this.props.userId}/goal/new`,
        'My Goals': `user/${this.props.userId}/goals`,
        'Music Buddies': `user/${this.props.userId}/buddies`,
        'About': '/about',
        'My Account': `user/${this.props.userId}/account`,
      }
    } else {
      menuItems = {
        Home: '/',
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
                <NavLink exact activeClassName="active" to={menuItems[item]}>{item}</NavLink>
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
