import React, { Component } from 'react';
import MenuBar from './MenuBar';
import DisplayPitches from './DisplayPitches'
import { trebleData, bassData } from '../music'

class SetGoal extends Component {
  state = {
    title: null,
    targetProgress: null,
    trebleData,
    bassData,
    treblePitchesSelected: [],
    bassPitchesSelected: [],
    validationMessage: null,
  }

  setTitle = e => {
    this.setState({ title: e.target.value })
  }

  setSeconds = e => {
    this.setState({ targetProgress: Number(e.target.value) * 1000 })
  }

  toggleTreble = e => {
    const trebleData = { ...this.state.trebleData }
    trebleData.showStaff = e.target.checked
    this.setState({ trebleData })
  }

  toggleBass = e => {
    const bassData = { ...this.state.bassData }
    bassData.showStaff = e.target.checked
    this.setState({ bassData })
  }

  selectPitch = (pitch, staff) => {
    if (staff === 'treble') {
      this.selectTrebleNote(pitch)
    } else if (staff = 'bass') {
      this.selectBassNote(pitch)
    }
  }

  selectTrebleNote(pitch) {
    const data = { ...this.state.trebleData }
    const note = data.notes[pitch]
    note.status === 'selected' ? note.status = '' : note.status = 'selected'

    const treblePitchesSelected = this.updateSelectedPitches(data.notes)
    this.setState({ trebleData, treblePitchesSelected })
  }

  selectBassNote(pitch) {
    const data = { ...this.state.bassData }
    const note = data.notes[pitch]
    note.status === 'selected' ? note.status = '' : note.status = 'selected'

    const bassPitchesSelected = this.updateSelectedPitches(data.notes)
    this.setState({ bassData, bassPitchesSelected })
  }

  updateSelectedPitches(notes) { // returns an array of pitch names.
    const array = Object.keys(notes).filter( note => (notes[note].status === 'selected') )
    console.log(array)
    return array
  }

  countSelectedPitches() {
    return this.state.trebleData.selectedPitches.length + this.state.bassData.selectedPitches.length
  }

  saveGoal = e => {
    e.preventDefault()
    const goal = {
      title: this.state.title,
      targetProgress: this.state.targetProgress,
      pitches: this.state.treblePitchesSelected.concat(this.state.bassPitchesSelected)
    }
    console.log(goal)
    if (goal.pitches.length < 4) {
      this.setState({ validationMessage: 'You must select 4 pitches or more.'})
    } else {
      this.setState({ validationMessage: null })
    }
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
              <input type="text" placeholder="Title" onBlur={this.setTitle} minLength="4" pattern="[a-zA-Z0-9]+.*" required/>
            </fieldset>
            <fieldset>
              <h3>2. Enter a number of seconds for each note.</h3>
              <p>We suggest 3-6 seconds for beginners.</p>
              <label><input type="number" name="targetProgress" defaultValue="4.5" onBlur={this.setSeconds} step=".01" required/> seconds</label>
            </fieldset>
            <fieldset>
              <h3>3. Select a set of notes for this goal.</h3>
              <fieldset id="options">
              <legend>Options:</legend>
                {/*<label>
                  <input
                    type="checkbox"
                    name="ledger"
                    onChange={this.toggleLedger}
                  />
                  Ledger Lines
                </label>*/}
                <label>
                  <input
                    type="checkbox"
                    name="treble"
                    onChange={this.toggleTreble}
                    defaultChecked
                  />
                  Treble clef
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="bass"
                    onChange={this.toggleBass}
                    defaultChecked
                  />
                  Bass clef
                </label>
                {/*<label>
                  <input
                    type="checkbox"
                    name="alto"
                    onChange={this.toggleStaff}
                    checked={this.state.showStaff.alto}
                  />
                  Alto clef
                </label>*/}
              </fieldset>
              {this.state.trebleData.showStaff &&
                <DisplayPitches
                  pitches={this.state.trebleData.notes}
                  staff="treble"
                  selectPitch={this.selectPitch}
                />
              }
              {this.state.bassData.showStaff &&
                <DisplayPitches
                  pitches={this.state.bassData.notes}
                  staff="bass"
                  selectPitch={this.selectPitch}
                />
              }
              <p>You have selected {this.state.treblePitchesSelected.length + this.state.bassPitchesSelected.length} notes.</p>
              {this.state.validationMessage && <p className="warning">{this.state.validationMessage}</p>}
            </fieldset>
            <button type="submit" className="go">Save</button>
          </form>
        </main>
      </div>
    )
  }
}

export default SetGoal
