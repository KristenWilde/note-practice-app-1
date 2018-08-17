import React from 'react'
// import PropTypes from 'prop-types';
import '../css/staffnotes.css'

class Note extends React.Component {
  // Props: id - 'a4t02'
  //        status -  'selected' or ''
  //        position - positive or neg integer. 0 is bottom space.
  //        selectPitch - function.

  left(position) {
    if (this.props.noteType === 'quiz-note') {
      return 15
    }
    return Math.abs(position % 2) * 7 + 9
  }

  handleClick = e => {
    if (this.props.selectPitch) {
      this.props.selectPitch(e.target.id, this.props.staff)
    }
  }

  handleAnimationEnd = e => {
    if (e.animationName === 'fade-out'){
      this.props.showNextPitch()
    } else {
      this.props.resetStatus()
    }
  }

  render() {
    const position = parseInt(this.props.id.slice(3,5), 10)

    const ledgerLineBelow1 = <div className="ledger-line" style={{bottom: '-2em', left: `${this.left(position) - .6}em`}}></div>
    const ledgerLineBelow2 = <div className="ledger-line" style={{bottom: '-4em', left: `${this.left(position) - .6}em`}}></div>
    const ledgerLineAbove1 = <div className="ledger-line" style={{bottom: '10em', left: `${this.left(position) - .6}em`}}></div>
    const ledgerLineAbove2 = <div className="ledger-line" style={{bottom: '12em', left: `${this.left(position) - .6}em`}}></div>

    return(
      <div>
        <div
          id={this.props.id}
          className={`note ${this.props.noteType} ${this.props.status}`}
          style={{bottom: `${position}em`, left: `${this.left(position)}em` }}
          onClick={this.handleClick}
          key={this.props.id}
          onAnimationEnd={this.handleAnimationEnd}
        >
          {this.props.id[0].toUpperCase()}
        </div>
        {position >= 11 && ledgerLineAbove2}
        {position >= 9 && ledgerLineAbove1}
        {position < -2 && ledgerLineBelow1}
        {position < -4 && ledgerLineBelow2}
      </div>
    )
  }
}

export default Note
