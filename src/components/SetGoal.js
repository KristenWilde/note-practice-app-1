import React, { Component } from 'react';
import MenuBar from './MenuBar';
import PickNotes from './PickNotes'

class SetGoal extends Component {
  state = {
    title: null,
    targetProgress: null,
    validationMessage: null,
    pitchesSelected: null,
    numPitchesSelected: 0,
  }

  setTitle = e => {
    this.setState({ title: e.target.value })
  }

  setSeconds = e => {
    this.setState({ targetProgress: Number(e.target.value) * 1000 })
  }

  updatePitchesSelected = pitches => {
    this.setState({ pitchesSelected: pitches, numPitchesSelected: pitches.length })
  }

  saveGoal = e => {
    e.preventDefault()
    const goal = {
      title: this.state.title,
      targetProgress: this.state.targetProgress,
      pitches: this.state.pitchesSelected
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
              <PickNotes updatePitchesSelected={this.updatePitchesSelected}/>
              <p>You have selected {this.state.numPitchesSelected} notes.</p>
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
