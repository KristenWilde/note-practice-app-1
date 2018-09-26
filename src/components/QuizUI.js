import React from 'react'
import QuizStaves from './QuizStaves'
import Keyboard from './Keyboard'

export default function QuizUI({ title, problemsLeft, pause, 
                      allPitchIds, currentPitch, correct, showNextPitch, resetStatus, 
                      handleAnswer }) {

  return (
    <div>
      <header className="quiz">
        <h4>{title}</h4>
        <p className="problemsleft">{problemsLeft} notes to go!</p>
        <a className="pause" onClick={pause}>Pause</a>
      </header>
      <QuizStaves
        currentPitch={currentPitch}
        allPitchIds={allPitchIds}
        correct={correct}
        showNextPitch={showNextPitch}
        resetStatus={resetStatus}
      />
      <Keyboard handleAnswer={handleAnswer} />
    </div>
  )
}