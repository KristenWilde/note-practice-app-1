
export const bassNoteNames = ['g2b', 'a2b', 'b2b', 'c3b', 'd3b', 'e3b', 'f3b',
                             'g3b', 'a3b', 'b3b', 'c4b']

export const trebleNoteNames = ['c4t', 'd4t', 'e4t', 'f4t',
                             'g4t', 'a4t', 'b4t', 'c5t', 'd5t', 'e5t', 'f5t']

export const bassLedgerNames = ['c2b', 'd2b', 'e2b', 'f2b',
                                'd4b', 'e4b', 'f4b']

export const trebleLedgerNames = ['g3t', 'a3t', 'b3t',
                                  'g5t', 'a5t', 'b5t', 'c6t']

export const allNoteNames = bassNoteNames.concat(trebleNoteNames, trebleLedgerNames, bassLedgerNames)

function NoteObj(noteName) {
  this.name = noteName
  this.status = ''
  this.sound = noteName.slice(0, 2)
  this.staff = noteName[2]
}

export const allNotes = allNoteNames.map( name => new NoteObj(name) )

