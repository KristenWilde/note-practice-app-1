import React, { Component } from 'react';
import '../css/menubar.css'

class MenuBar extends Component {
  navigate (e) => {

  }

  showMenu (e) => {
    e.currentTarget.classList.toggle('opened');
  }

  render() {
    return (
      <header>
        <h1>MyNotePractice</h1>
        <nav>
          <button id="nav-toggle" onClick={this.showMenu}>
            <span></span>
          </button>
          <ul onClick={this.navigate}>
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
