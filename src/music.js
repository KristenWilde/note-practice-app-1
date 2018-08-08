
export const bassNoteNames = ['c2b', 'd2b', 'e2b', 'f2b', 'g2b', 'a2b', 'b2b', 'c3b', 'd3b', 'e3b', 'f3b',
                             'g3b', 'a3b', 'b3b', 'c4b', 'd4b', 'e4b', 'f4b']

export const bassData = bassNoteNames.reduce(function(obj, name, idx) {
  obj[name] = { position: idx - 5, status: '' }
  return obj
}, {})

// export const bassData = {
//     c2: { position: -4, status: null },
//     d2: { position: -3, status: null },
//     e2: { position: -2, status: null },
//     f2: { position: -1, status: null },
//     g2: { position: 0, status: null },
//     a2: { position: 1, status: null },
//     b2: { position: 2, status: null },
//     c3: { position: 3, status: null },
//     d3: { position: 4, status: null },
//     e3: { position: 5, status: null },
//     f3: { position: 6, status: null },
//     g3: { position: 7, status: null },
//     a3: { position: 8, status: null },
//     b3: { position: 9, status: null },
//     c4: { position: 10, status: null },
//     d4: { position: 11, status: null },
//     e4: { position: 12, status: null },
//     // f4: { position: 13, status: null },
// }

export const trebleData = {
    g3: { position: -5, status: null },
    a3: { position: -4, status: null },
    b3: { position: -3, status: null },
    c4: { position: -2, status: null },
    d4: { position: -1, status: null },
    e4: { position: 0, status: null },
    f4: { position: 1, status: null },
    g4: { position: 2, status: null },
    a4: { position: 3, status: null },
    b4: { position: 4, status: null },
    c5: { position: 5, status: null },
    d5: { position: 6, status: null },
    e5: { position: 7, status: null },
    f5: { position: 8, status: null },
    g5: { position: 9, status: null },
    a5: { position: 10, status: null },
    b5: { position: 11, status: null },
    c6: { position: 12, status: null },
}




export const bassLedgerNames = [
                                ]

export const trebleNoteNames = ['c4t', 'd4t', 'e4t', 'f4t',
                             'g4t', 'a4t', 'b4t', 'c5t', 'd5t', 'e5t', 'f5t']

export const trebleLedgerNames = ['g3t', 'a3t', 'b3t',
                                  'g5t', 'a5t', 'b5t', 'c6t']

export const altoNoteNames = ['f3a', 'g3a', 'a3a', 'b3a', 'c4a', 'd4a', 'e4a', 'f4a', 'g4a']

export const altoLedgerNames = ['c3a', 'd3a', 'e3a', 'a4a', 'b4a', 'c5a', 'd5a', 'e5a', 'f5a', 'g5a']

export const allNoteNames = bassNoteNames.concat(bassLedgerNames, trebleNoteNames, trebleLedgerNames, altoNoteNames, altoLedgerNames)

function NoteObj(noteName) {
  this.name = noteName
  this.status = ''
  this.sound = noteName.slice(0, 2)
  this.staff = (noteName[2])
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

export const allNotes = notes(allNoteNames)

const allNoteObjArray = allNoteNames.map( noteName => new NoteObj(noteName) )



