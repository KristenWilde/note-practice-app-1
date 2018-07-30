import React, { Component } from 'react';
import '../css/menubar.css'

class MenuBar extends Component {
  render() {
    return (
      <header>
        <h1>MyNotePractice</h1>
        <nav>
          <a href="#" id="nav-toggle">
            <span></span>
          </a>
          <ul>
            <li>Practice</li>
            <li>Set a Goal</li>
            <li>View Progress</li>
            <li>Music Buddies</li>
            <li>FAQ</li>
            <li>My Profile</li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default MenuBar
