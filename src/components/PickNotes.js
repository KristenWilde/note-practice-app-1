import React, { Component } from 'react';
import MenuBar from './MenuBar';
import Staff from './Staff'
import { trebleData, bassData } from '../music'

class PickNotes extends Component {
  //Props: pitchesSelected - an array, empty at first.
  //       updatePitchesSelected - a function that takes an array of pitches and saves it as pitchesSelected.

  state = {
    trebleData,
    bassData,
    treblePitchesSelected: [],
    bassPitchesSelected: [],
    showTreble: true,
    showBass: true,
    showLedger: false,
    visibleSelection: []
  }

  toggleTreble = e => {
    const visibleSelection = this.getVisibleSelection(this.state.treblePitchesSelected, e.target.checked, this.state.bassPitchesSelected, this.state.showBass)
    this.props.updatePitchesSelected(visibleSelection)
    this.setState({ showTreble: e.target.checked })
  }

  toggleBass = e => {
    const visibleSelection = this.getVisibleSelection(this.state.bassPitchesSelected, e.target.checked, this.state.treblePitchesSelected, this.state.showTreble)
    this.props.updatePitchesSelected(visibleSelection)
    this.setState({ showBass: e.target.checked })
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
    const note = data[pitch]
    note.status === 'selected' ? note.status = '' : note.status = 'selected'

    const treblePitchesSelected = this.selectedPitches(data)
    const visibleSelection = this.getVisibleSelection(treblePitchesSelected, this.state.showTreble, this.state.bassPitchesSelected, this.state.showBass)
    this.props.updatePitchesSelected(visibleSelection)

    this.setState({ trebleData: data, treblePitchesSelected })
  }

  selectBassNote(pitch) {
    const data = { ...this.state.bassData }
    const note = data[pitch]
    note.status === 'selected' ? note.status = '' : note.status = 'selected'

    const bassPitchesSelected = this.selectedPitches(data)
    const visibleSelection = this.getVisibleSelection(bassPitchesSelected, this.state.showBass, this.state.treblePitchesSelected, this.state.showTreble)
    this.props.updatePitchesSelected(visibleSelection)

    this.setState({ bassData: data, bassPitchesSelected })
  }

  getVisibleSelection(thisAr, thisShowing, otherAr, otherShowing) {
    let ar = thisShowing ? thisAr : []
    if (otherShowing) {
      ar = ar.concat(otherAr)
    }
    return ar
  }

  selectedPitches(notes) { // returns an array of pitch names.
    const array = Object.keys(notes).filter( note => (notes[note].status === 'selected') )
    console.log(array)
    return array
  }

  render() {
    return (
      <div>
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
        {this.state.showTreble &&
          <Staff
            pitches={this.state.trebleData}
            staff="treble"
            selectPitch={this.selectPitch}
          />
        }
        {this.state.showBass &&
          <Staff
            pitches={this.state.bassData}
            staff="bass"
            selectPitch={this.selectPitch}
          />
        }
      </div>
    )
  }
}

export default PickNotes
