import React from 'react'
import { Link } from 'react-router-dom'
import '../css/menubar.css'

class MenuBar extends React.Component {
  menuItems = {
    Practice: `/${this.props.userId}/practice`,
    'Set a Goal': `/${this.props.userId}/goal/new`,
    'View Progress': `/${this.props.userId}/progress`,
    'Music Buddies': `/${this.props.userId}/buddies`,
    FAQ: '/faq',
    'My Account': `/${this.props.userId}/account`,
    'Log out': '/',
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
            {Object.keys(this.menuItems).map(item => (
              <li key={item}>
                <Link to={this.menuItems[item]}>{item}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    )
  }
}

export default MenuBar
