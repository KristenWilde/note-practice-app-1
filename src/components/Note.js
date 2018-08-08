import React from 'react'
// import PropTypes from 'prop-types';
import '../css/quiz.css'
import '../css/staffnotes.css'

class Note extends React.Component {
  // Props: id - 'a4t'
  //        status -  'selected' or ''
  //        position - positive or neg integer. 0 is bottom space.
  //        selectPitch - function.

  left(position) {
    return `${Math.abs(position % 2) * 6 + 9}em`
  }

  ledgerLines(position) {

  }

  render() {
    const { id, position, status } = this.props

    return(
      <div>
        <div
          id={id}
          className={`note ${status}`}
          style={{bottom: `${position}em`, left: this.left(position)}}
          onClick={() => this.props.selectPitch(id, this.props.staff)}
          key={id}
        >
          {id[0].toUpperCase()}
        </div>
        {this.ledgerLines(position)}
      </div>
    )
  }
}

export default Note
