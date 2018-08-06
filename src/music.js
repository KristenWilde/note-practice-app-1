
export const bassNoteNames = ['g2b', 'a2b', 'b2b', 'c3b', 'd3b', 'e3b', 'f3b',
                             'g3b', 'a3b', 'b3b', 'c4b']

export const trebleNoteNames = ['c4t', 'd4t', 'e4t', 'f4t',
                             'g4t', 'a4t', 'b4t', 'c5t', 'd5t', 'e5t', 'f5t']

export const bassLedgerNames = ['c2b', 'd2b', 'e2b', 'f2b',
                                'd4b', 'e4b', 'f4b']

export const trebleLedgerNames = ['g3t', 'a3t', 'b3t',
                                  'g5t', 'a5t', 'b5t', 'c6t']

export const altoNoteNames = ['f3a', 'g3a', 'a3a', 'b3a', 'c4a', 'd4a', 'e4a', 'f4a', 'g4a']

export const altoLedgerNames = ['c3a', 'd3a', 'e3a', 'a4a', 'b4a', 'c5a', 'd5a', 'e5a', 'f5a', 'g5a']

function NoteObj(noteName) {
  this.name = noteName
  this.status = ''
  this.sound = noteName.slice(0, 2)
  this.staff = noteName[2]
}

function notes(noteNames) {
  const result = {}
  for (var i = 0; i < noteNames.length; i++) {
    result[noteNames[i]] = new NoteObj(noteNames[i])
  }
  return result
}

export const bassNotes = notes(bassNoteNames)
export const bassLedgerNotes = notes(bassLedgerNames)
export const trebleNotes = notes(trebleNoteNames)
export const trebleLedgerNotes = notes(trebleLedgerNames)
export const altoNotes = notes(altoNoteNames)
export const altoLedgerNotes = notes(altoLedgerNames)





