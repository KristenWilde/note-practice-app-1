import React from 'react'
// import PropTypes from 'prop-types';
import '../css/staffnotes.css'

class Note extends React.Component {
  // Props: id - 'a4t'
  //        status -  'selected' or ''
  //        position - positive or neg integer. 0 is bottom space.
  //        selectPitch - function.

  left(position) {
    return Math.abs(position % 2) * 6 + 9
  }

  handleClick = e => {
    if (this.props.selectPitch) {
      this.props.selectPitch(e.target.id, this.props.staff)
    }
  }

  render() {
    const { id, position, status } = this.props
    const ledgerLineBelow1 = <div className="ledger-line" style={{bottom: '-2em', left: `${this.left(position) - .6}em`}}></div>
    const ledgerLineBelow2 = <div className="ledger-line" style={{bottom: '-4em', left: `${this.left(position) - .6}em`}}></div>
    const ledgerLineAbove1 = <div className="ledger-line" style={{bottom: '10em', left: `${this.left(position) - .6}em`}}></div>
    const ledgerLineAbove2 = <div className="ledger-line" style={{bottom: '12em', left: `${this.left(position) - .6}em`}}></div>

    return(
      <div>
        <div
          id={id}
          className={`note ${status}`}
          style={{bottom: `${position}em`, left: `${this.left(position)}em` }}
          onClick={this.handleClick}
          key={id}
        >
          {id[0].toUpperCase()}
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
