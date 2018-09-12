import React from 'react'
import PropTypes from 'prop-types'
import MenuBar from './MenuBar'
import { getRawPitchData, goalsResults } from '../api-helpers'
import { Chart, Line } from 'react-chartjs-2'

class Progress extends React.Component {
  state = {
    goals: {
      "Treble Lines": {
        labels: ['9/1/2018', '9/3/2018', '9/3/2018', '9/10/2018'],
        datasets: [{data: [5.1, 4.6, 4.1, 4.2]}]
      },
    },
  }


  // componentDidMount(){
    // const rawData = getRawPitchData(this.props.match.params.userId)
    // const allGoalsResults = goalsResults(this.props.match.params.userId)
    // this.setState({ rawData, allGoalsResults })
  // }


  render() {
    return (
      <div>
        <MenuBar userId={this.props.match.params.userId}/>
        <main>This is where the user can see his/her progress.


          <Line data={this.state.goals["Treble Lines"]} />

        </main>

      </div>
    )
  }
}

export default Progress
