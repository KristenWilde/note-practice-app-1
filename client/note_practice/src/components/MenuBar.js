import React, { Component } from 'react';
import '../css/menubar.css'

class MenuBar extends Component {
  render() {
    return (
      <header>
        <h1>MyNotePractice</h1>
        <nav>
          <button id="nav-toggle">
            <span></span>
          </button>
          <ul>
            <li>Practice</li>
            <li>Set a Goal</li>
            <li>View Progress</li>
            <li>Music Buddies</li>
            <li>FAQ</li>
            <li>My Account</li>
            <li>Log Out</li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default MenuBar
