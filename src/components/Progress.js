import React from 'react'
import PropTypes from 'prop-types'
import MenuBar from './MenuBar'
import PickGoal from './PickGoal'
import DisplayGoal from './DisplayGoal'
import { getRawPitchData, goalsResults } from '../api-helpers'
import { Chart, Line } from 'react-chartjs-2'
import { selectGoal } from '../misc-helpers'


class Progress extends React.Component {
  selectGoal = selectGoal.bind(this)

  state = {
    firstname: 'Kristen',
    goals: [
      {
        goalId: '3q4quivuberyrvyhtiw',
        title: 'Treble Spaces',
        pitches: ['f4t00', 'a4t02', 'c5t04', 'e5t06'],
        targetProgress: 5000,
        chartData: {
          labels: ['9/1/2018', '9/3/2018', '9/3/2018', '9/10/2018', '9/11/2018', '9/11/2018', '9/12/2018', '9/13/2018'],
          datasets: [
            {data: [5.1, 4.6, 4.1, 4.2, 3.8, 3.7, 3.4, 3.3], label: 'Average seconds for all notes', fill:false, borderColor: 'magenta'},
            {data: [3,3,3,3,3,3,3,3], label: 'Goal', pointRadius: 0, fill: false, borderColor: 'teal'}
          ]
        }
      }
    ],
    currentGoalIdx: 0,
    chartOptions: {
      legend: { labels: { usePointStyle: true }, position: 'bottom'},
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 0.2,
            // min: this.minTick(this.state.goals[this.state.currentGoalIdx].chartData.datasets)
          }
        }]
      }
    }
  }



  minTick(datasets){
    const dataMin = Math.min(datasets[0].data)
    const goal = datasets[1].data[0]
    return Math.min(dataMin, goal) - 0.2
  }

  // componentDidMount(){
    // const rawData = getRawPitchData(this.props.match.params.userId)
    // const allGoalsResults = goalsResults(this.props.match.params.userId)
    // this.setState({ rawData, allGoalsResults })
  // }


  render() {
    const goal = this.state.goals[this.state.currentGoalIdx]

    return (
      <div>
        <MenuBar userId={this.props.match.params.userId}/>
        <main>
          <h1>{this.state.firstname}'s Progress</h1>

          <h2>Goal: {goal.title}</h2>
          <Line data={goal.chartData} options={this.state.chartOptions}/>

          <PickGoal goals={this.state.goals} selectGoal={this.selectGoal} currentGoalIdx={this.state.currentGoalIdx}/>
          <DisplayGoal goal={goal}/>
        </main>

      </div>
    )
  }
}

export default Progress
