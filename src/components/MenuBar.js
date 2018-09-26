import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import '../css/menubar.css'

function MenuBar(props) {

  const showMenu = event => {
    event.currentTarget.classList.toggle('opened')
  }

  let menuItems
  
  if (props.userId) {
    menuItems = {
      'Set a Goal': `user/${props.userId}/goal/new`,
      'My Goals': `user/${props.userId}/goals`,
      'Music Buddies': `user/${props.userId}/buddies`,
      'About': '/about',
      'My Account': `user/${props.userId}/account`,
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
        <button id="nav-toggle" onClick={showMenu}>
          <span />
        </button>
        <ul>
          {Object.keys(menuItems).map(item => (
            <li key={item}>
              <NavLink exact activeClassName="active" to={menuItems[item]}>{item}</NavLink>
            </li>
          ))}
          {props.userId && <li><a onClick={props.logOut}>Log out</a></li>}
        </ul>
      </nav>
    </header>
  )
}

export default MenuBar
