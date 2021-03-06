
export const bassNoteIds = ['c2b-5', 'd2b-4', 'e2b-3', 'f2b-2', 'g2b-1', 'a2b00', 'b2b01', 'c3b02', 'd3b03', 'e3b04', 'f3b05',
                             'g3b06', 'a3b07', 'b3b08', 'c4b09', 'd4b10', 'e4b11']

export const trebleNoteIds = ['g3t-6', 'a3t-5', 'b3t-4', 'c4t-3', 'd4t-2', 'e4t-1', 'f4t00',
                             'g4t01', 'a4t02', 'b4t03', 'c5t04', 'd5t05', 'e5t06', 'f5t07', 'g5t08', 'a5t09', 'b5t10', 'c6t11']

export const altoNoteIds = ['c3a-4', 'd3a-3', 'e3a-2', 'f3a-1', 'g3a00', 'a3a01', 'b3a02', 'c4a03', 'd4a04', 'e4a05', 'f4a06',
                              'g4a07', 'a4a08', 'b4a09', 'c5a10', 'd5a11', 'e5a12', 'f5a13']

// function noteDataObj(noteIds, lowestPosition) {
//   return noteIds.reduce(function(obj, noteId, idx) {
//     obj[noteId] = { position: idx + lowestPosition, status: '' }
//     return obj
//   }, {})
// }

export function NotesObj(noteIds) {
  for (let i = 0; i < noteIds.length; i++) {
    this[noteIds[i]] = undefined
  }
}

export function staffNotesObj(allNoteIds, staff) {
  const noteIds = allNoteIds.filter( id => id[2] === staff[0] )
  if (noteIds.length > 0) {
    return new NotesObj(noteIds)
  }
}

export const bassNotesObj = new NotesObj(bassNoteIds)

export const trebleNotesObj = new NotesObj(trebleNoteIds)

export const altoNotesObj = new NotesObj(altoNoteIds)

export const staffName = function(noteId) {
  switch (noteId[2]) {
    case 't':
    return 'treble'
    case 'b':
    return 'bass'
    case 'a':
    return 'alto'
  }
}

// returns object for one staff {'e4t': {position: -1, status: ''}, 'f4t': {position: 0, status: ''}}
// export function goalData(allNoteIds, staff) {
//   const noteIds = allNoteIds.filter(function(id) {
//     return staffName(id) === staff
//   })
//   if (noteIds.length === 0) { return null }

//   return noteIds.reduce(function(obj, noteId) {
//     obj[noteId] = noteData[staff][noteId]
//     return obj
//   }, {})
// }

export function noteScores(noteIds) {
  return noteIds.reduce(function(obj, noteId) {
    obj[noteId] = []
    return obj
  }, {})
}

export function hasStaff(noteIds, staff) {
  return noteIds.some(function(id) {
    console.log(staffName(id))
    return id[2] === staff[0]
  })
}

export function shuffleIds(noteIds) {
  let ids = noteIds.slice()
  const result = ids.splice(1, 1) // Start with the second element in the old array, to avoid same pitch twice in a row.
  while (ids.length > 0) {
    const idx = Math.floor(Math.random() * ids.length)
    const id = ids.splice(idx, 1)[0]
    result.push(id)
  }
  return result
}

export function randomizedQuizIds(noteIds, rounds){
  let result = []
  let shuffled = noteIds
  for (let i = 0; i < rounds; i++) {
    shuffled = shuffleIds(shuffled)
    result = result.concat(shuffled)
    console.log(result)
  }
  return result;
}

export function formatQuizResults(userId, goalId, noteScores) {
  const date = new Date().toDateString()
  const result = {
    userId,
    goalId,
    date,
    speed: undefined,
    noteResults: []
  }
  const allSpeeds = []

  Object.keys(noteScores).forEach((pitchId) => {
    const speed = average(noteScores[pitchId])
    allSpeeds.push(speed)
    result.noteResults.push({ pitchId, speed, date })
  })

  result.speed = average(allSpeeds)
  return result
}

function average(speeds) {
  return Math.round(speeds.reduce((sum, speed) => {
    return sum + speed
  }, 0) / speeds.length)
}

export function staffLinesTop(pitchAr){
  const highestPosition = pitchAr.reduce((highest, pitchId) => {
    const position = parseInt(pitchId.slice(3,5))
    return highest > position ? highest : position
  },0)
  if (highestPosition < 8) {
    return 0
  }
  return highestPosition % 8
}

export function staffWrapperHeight(pitchAr){
  const lowestPosition = pitchAr.reduce((lowest, pitchId) => {
    const position = parseInt(pitchId.slice(3,5))
    return lowest < position ? lowest : position
  }, 0)
  const top = staffLinesTop(pitchAr)
  if (lowestPosition < -2) {
    return - lowestPosition + top + 10
  }
  return top + 13
}

export function pitchIdsForStaff(allPitchIds, staff) {
  return allPitchIds.filter(pitchId => pitchId[2] === staff[0])
}


