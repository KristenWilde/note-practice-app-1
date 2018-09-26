import React from 'react'
// import PropTypes from 'prop-types';
import '../css/staffnotes.css'

function Note({ id, staff, status, selectPitch, noteType, showNextPitch, resetStatus }) {

  const position = parseInt(id.slice(3,5), 10)

  function left(position) {
    if (noteType === 'quiz-note') {
      return 17
    }
    return Math.abs(position % 2) * 7 + 13
  }

  const handleClick = e => {
    if (selectPitch) {
      selectPitch(e.target.id, staff)
    }
  }

  const handleAnimationEnd = e => {
    if (e.animationName === 'fade-out'){
      showNextPitch()
    } else {
      resetStatus()
    }
  }


    const ledgerLineBelow1 = <div className="ledger-line" style={{bottom: '-2em', left: `${left(position) - .6}em`}}></div>
    const ledgerLineBelow2 = <div className="ledger-line" style={{bottom: '-4em', left: `${left(position) - .6}em`}}></div>
    const ledgerLineAbove1 = <div className="ledger-line" style={{bottom: '10em', left: `${left(position) - .6}em`}}></div>
    const ledgerLineAbove2 = <div className="ledger-line" style={{bottom: '12em', left: `${left(position) - .6}em`}}></div>

    return(
      <div>
        <div
          id={id}
          className={`note ${noteType} ${status}`}
          style={{bottom: `${position}em`, left: `${left(position)}em` }}
          onClick={handleClick}
          key={id}
          onAnimationEnd={handleAnimationEnd}
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

export default Note
