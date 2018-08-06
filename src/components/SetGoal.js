import React, { Component } from 'react';
import MenuBar from './MenuBar';
import DisplayPitches from './DisplayPitches'
import { bassNotes, bassLedgerNotes, trebleNotes, trebleLedgerNotes, altoNotes, altoLedgerNotes } from '../music'

class SetGoal extends Component {
  state = {
    title: null,
    seconds: null,
    showStaff: {
      'bass': true,
      'treble': true,
      'alto': false
    },
    showLedger: false,
    pitchesCount: 0,
    pitchesSelected: [],
  }

  toggleStaff = e => {
    const staff = e.target.name
    const showStaff = { ...this.state.showStaff }
    showStaff[staff] = e.target.checked
    if (staff === 'alto') {
      showStaff.bass = false
      showStaff.treble = false
    } else {
      showStaff.alto = false
    }
    this.setState({ showStaff })
  }

  toggleLedger = e => {
    this.setState({ showLedger: e.target.checked })
  }

  notesToDisplay() {
    const bass = this.state.showStaff.bass ? bassNotes : {}
    const bassLedger = (this.state.showStaff.bass && this.state.showLedger) ? bassLedgerNotes : {}
    const treble = this.state.showStaff.treble ? trebleNotes : {}
    const trebleLedger = (this.state.showStaff.treble && this.state.showLedger) ? trebleLedgerNotes : {}
    const alto = this.state.showStaff.alto ? altoNotes : {}
    const altoLedger = (this.state.showStaff.alto && this.state.showLedger) ? altoLedgerNotes : {}
    return Object.assign({}, bass, bassLedger, treble, trebleLedger, alto, altoLedger)
  }

  render() {
    return (
      <div>
        <MenuBar userId={this.props.match.params.userId}/>
        <main>
          <h1>Set a goal</h1>
          <form onSubmit={this.saveGoal}>
            <fieldset>
              <h3>1. Enter a title for your goal.</h3>
              <p>Examples: "Treble lines", "Violin D string"</p>
              <input type="text" name="title"/>
            </fieldset>
            <fieldset>
              <h3>2. Enter a number of seconds for each note.</h3>
              <p>We suggest 3-6 seconds for beginners.</p>
              <input type="number" name="targetProgress" defaultValue="5"/>
            </fieldset>
            <fieldset>
              <h3>3. Select a set of notes for this goal.</h3>
              <h4>Options</h4>
              <fieldset id="options">
                <label>
                  <input
                    type="checkbox"
                    name="ledger"
                    onChange={this.toggleLedger}
                  />
                  Ledger Lines
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="treble"
                    onChange={this.toggleStaff}
                    checked={this.state.showStaff.treble}
                  />
                  Treble clef
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="bass"
                    onChange={this.toggleStaff}
                    checked={this.state.showStaff.bass}
                  />
                  Bass clef
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="alto"
                    onChange={this.toggleStaff}
                    checked={this.state.showStaff.alto}
                  />
                  Alto clef
                </label>
              </fieldset>
              <DisplayPitches pitches={this.notesToDisplay()}/>
            </fieldset>
          </form>
        </main>
      </div>
    )
  }
}

export default SetGoal
