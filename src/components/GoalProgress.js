import React from 'react'
import PropTypes from 'prop-types'
import { getRawPitchData, goalsResults } from '../api-helpers'
import { Chart, Line } from 'react-chartjs-2'

class GoalProgress extends React.Component {
  state = {
    firstname: 'Kristen',
    goals: [
      {
        goalId: '3q4quivuberyrvyhtiw',
        title: 'Treble Spaces',
        pitches: ['f4t00', 'a4t02', 'c5t04', 'e5t06'],
        targetProgress: 3000,
        chartData: {
          labels: ['9/1/2018', '9/3/2018', '9/3/2018', '9/10/2018', '9/11/2018', '9/11/2018', '9/12/2018', '9/13/2018'],
          datasets: [
            {data: [5.1, 4.6, 4.1, 4.2, 3.8, 3.7, 3.4, 3.3], label: 'Average seconds per note', fill:false, borderColor: 'magenta'},
            {data: [3,3,3,3,3,3,3,3], label: 'Target', pointRadius: 0, fill: false, borderColor: 'teal'}
          ]
        }
      }
    ],
  }
  chartData(goal) {
    return {
          labels: ['9/1/2018', '9/3/2018', '9/3/2018', '9/10/2018', '9/11/2018', '9/11/2018', '9/12/2018', '9/13/2018'],
          datasets: [
            {data: [5.1, 4.6, 4.1, 4.2, 3.8, 3.7, 3.4, 3.3], label: 'Average seconds per note', fill:false, borderColor: 'magenta'},
            {data: [3,3,3,3,3,3,3,3], label: 'Target', pointRadius: 0, fill: false, borderColor: 'teal'}
          ]
        }
  }


  chartOptions(datasets) {

    const min = this.minTick(datasets)
    return {
      legend: { labels: { usePointStyle: true }, position: 'bottom'},
      scales: {
        yAxes: [{
          ticks: {
            // stepSize: 0.2,
            min
          }
        }]
      }
    }
  }

  minTick(datasets){
    const dataMin = Math.min(datasets[0].data)
    const goal = datasets[1].data[0]
    const min = Math.floor(Math.min(dataMin, goal)) - 0.5
    console.log(min)
    return min
  }

  // componentDidMount(){
    // const rawData = getRawPitchData(this.props.match.params.userId)
    // const allGoalsResults = goalsResults(this.props.match.params.userId)
    // this.setState({ rawData, allGoalsResults })
  // }


  render() {

    return (
      <div>
        <Line data={this.chartData(this.props.goal)} />
      </div>
    )
  }
}

export default GoalProgress
