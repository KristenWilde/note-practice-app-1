import React, { Component } from 'react';
import MenuBar from './MenuBar';
import PickNotes from './PickNotes'
import token, { sampleUserId } from '../token'

class SetGoal extends Component {
  state = {
    title: null,
    targetProgress: 4500,
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

  submit = e => {
    e.preventDefault()

    const goal = {
      goaltitle: this.state.title,
      targetprogress: this.state.targetProgress,
      // pitches: this.state.pitchesSelected
    }

    // if (goal.pitches.length < 4) {
    //   this.setState({ validationMessage: 'You must select 4 pitches or more.'})
    // } else {
    //   this.setState({ validationMessage: null })
    //   this.save(goal)
    // }
    this.save(goal)
  }

  save(goal) {
    const url = `http://musical-app.herokuapp.com/${sampleUserId}/newgoal`
    const myHeaders = new Headers()
    myHeaders.append('token', token)
    myHeaders.append('Content-Type', 'application/json')

    const body = JSON.stringify(goal)
    console.log(body)

    fetch(url, { method: 'POST', headers: myHeaders, body: body })
    .then(result => result.json())
    .then(result => {
        console.log(result)
      }
    ).catch(err => console.log(err))
  }



  render() {
    return (
      <div>
        <MenuBar userId={this.props.match.params.userId}/>
        <main>
          <h1>Set a goal</h1>
          <form onSubmit={this.submit}>
            <fieldset>
              <p className="step">1. Enter a title for your goal.</p>
              <p>Examples: "Treble lines", "Violin D string"</p>
              <input type="text" placeholder="Title" onBlur={this.setTitle} minLength="4" pattern="[a-zA-Z0-9]+.*" required/>
            </fieldset>
            <fieldset>
              <p className="step">2. Enter a number of seconds for each note.</p>
              <p>We suggest 3-6 seconds for beginners.</p>
              <label><input type="number" name="targetProgress" defaultValue="4.5" onBlur={this.setSeconds} step=".01" required/> seconds</label>
            </fieldset>
            <fieldset>
              <p className="step">3. Select a set of notes for this goal.</p>
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
