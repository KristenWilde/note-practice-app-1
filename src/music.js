
export const bassNoteIds = ['c2b', 'd2b', 'e2b', 'f2b', 'g2b', 'a2b', 'b2b', 'c3b', 'd3b', 'e3b', 'f3b',
                             'g3b', 'a3b', 'b3b', 'c4b', 'd4b', 'e4b']

export const trebleNoteIds = ['g3t', 'a3t', 'b3t', 'c4t', 'd4t', 'e4t', 'f4t',
                             'g4t', 'a4t', 'b4t', 'c5t', 'd5t', 'e5t', 'f5t', 'g5t', 'a5t', 'b5t', 'c6t']

export const altoNoteIds = ['c3a', 'd3a', 'e3a', 'f3a', 'g3a', 'a3a', 'b3a', 'c4a', 'd4a', 'e4a', 'f4a',
                              'g4a', 'a4a', 'b4a', 'c5a', 'd5a', 'e5a', 'f5a', 'g5a']

function noteDataObj(noteIds, lowestPosition) {
  return noteIds.reduce(function(obj, noteId, idx) {
    obj[noteId] = { position: idx + lowestPosition, status: '' }
    return obj
  }, {})
}

export const bassData = noteDataObj(bassNoteIds, -5)

export const trebleData = noteDataObj(trebleNoteIds, -6)

export const altoData = noteDataObj(altoNoteIds, -6)

export const noteData = {
  treble: trebleData,
  bass: bassData,
  alto: altoData,
}

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

export function goalData(allNoteIds, staff) {


  const noteIds = allNoteIds.filter(function(id) {
    return staffName(id) === staff
  })
  console.log(noteIds)
  if (noteIds.length === 0) { return null }

  return noteIds.reduce(function(obj, noteId) {
    obj[noteId] = noteData[staff][noteId]
    return obj
  }, {})
}

