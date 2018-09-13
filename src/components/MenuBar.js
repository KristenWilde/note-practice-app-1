import React from 'react'
import { Link } from 'react-router-dom'
import '../css/menubar.css'

class MenuBar extends React.Component {
  state = {
    menuItems: {
      'Sign up': '/register',
      'Log in': '/login',
      About: '/about',
    }
  }

  componentDidMount() {
    if (this.props.userId){
      const menuItems = {
        'Set a Goal': `/${this.props.userId}/goal/new`,
        'My Goals': `/${this.props.userId}/goals`,
        'Music Buddies': `/${this.props.userId}/buddies`,
        'About': '/about',
        'My Account': `/${this.props.userId}/account`,
        'Log out': '/',
      }
      this.setState({ menuItems })
    }
  }

  showMenu = event => {
    event.currentTarget.classList.toggle('opened')
  }

  render() {
    return (
      <header className="main">
        <h1>MyNotePractice</h1>
        <nav>
          <button id="nav-toggle" onClick={this.showMenu}>
            <span />
          </button>
          <ul>
            {Object.keys(this.state.menuItems).map(item => (
              <li key={item}>
                <Link to={this.state.menuItems[item]}>{item}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    )
  }
}

export default MenuBar
