import React from 'react'
import Staff from './Staff'
import { pitchIdsForStaff, staffLinesTop, staffWrapperHeight } from '../music.js'

// const propsNeeded = 

export default function QuizStaves({ 
  allPitchIds, currentPitch, correct, showNextPitch, resetStatus }) {

  let trebleTop = 0
  let trebleHeight = 12
  let bassTop = 0
  let bassHeight = 10
  let altoTop = 0
  let altoHeight = 10
  const trebleIds = pitchIdsForStaff(allPitchIds, 'treble')
  const bassIds = pitchIdsForStaff(allPitchIds, 'bass')
  const altoIds = pitchIdsForStaff(allPitchIds, 'alto')

  if (trebleIds.length){
    trebleTop = staffLinesTop(trebleIds)
    trebleHeight = staffWrapperHeight(trebleIds)
  }
  if (bassIds.length){
    bassTop = staffLinesTop(bassIds)
    bassHeight = staffWrapperHeight(bassIds)
  }
  if (altoIds.length){
    altoTop = staffLinesTop(altoIds)
    altoHeight = staffWrapperHeight(altoIds)
  }

  return (
    <div>
      {trebleIds.length && (
        <Staff
          staff="treble"
          quizPitchId={currentPitch}
          pitchStatus={correct}
          showNextPitch={showNextPitch}
          resetStatus={resetStatus}
          top={trebleTop}
          height={trebleHeight}
        />
      )}
      {bassIds.length && (
        <Staff
          staff="bass"
          quizPitchId={currentPitch}
          pitchStatus={correct}
          showNextPitch={showNextPitch}
          resetStatus={resetStatus}
          top={bassTop}
          height={bassHeight}
        />
      )}
      {altoIds.length && (
        <Staff
          staff="alto"
          quizPitchId={currentPitch}
          pitchStatus={correct}
          showNextPitch={showNextPitch}
          resetStatus={resetStatus}
          top={altoTop}
          height={altoHeight}
        />
      )}
    </div>
  )
}