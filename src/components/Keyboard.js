import React from 'react'

export default function Keyboard({ handleAnswer }) {
  function pianoAnimation(e) {
    e.currentTarget.classList.add('pressed')
  }

  function resetPianoAnimation(e) {
    e.currentTarget.classList.remove('pressed')
  }

  return (
    <section id="keyboard">
      <div id="answers" onClick={handleAnswer}>
        {['C','D','E','F','G','A','B'].map(letter => (
          <div 
            className="answer-button" 
            onClick={pianoAnimation}
            onAnimationEnd={resetPianoAnimation}
            key={letter}
          >
            <span>{letter}</span>
          </div>
        ))}
      </div>
      {['1','2','3','4','5'].map(num => (
        <div 
          id={'black-key' + num} 
          className="black-key"
          key={num}
        >
          <div />
          <div />
        </div>
      ))}
    </section>
  )
}