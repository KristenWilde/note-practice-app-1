import React from 'react'
// import PropTypes from 'prop-types'
// import { getRawPitchData, goalsResults } from '../api-helpers'
import { Chart, Line } from 'react-chartjs-2'

export default function GoalProgress({ goal }) {
    // Goal: {
    //   goalId: 'T234234',
    //   title: 'Assorted Notes',
    //   pitchIds: ['g3b06', 'a3b07', 'b3b08', 'c4b09', 'g4t01', 'a4t02', 'b4t03', 'c5t04'],
    //   targetProgress: 3000,
    //   results: [
      //   {date: "Sat Aug 29 2018", speed: 5011}, 
      //   {date: "Sun Aug 30 2018", speed: 7744},
      //   {date: "Wed Sep 26 2018", speed: 4044}
      // ],
    //   dateSet: "Sat Aug 29 2018",
    //   dateUpdated: "Sun Aug 30 2018",
    // },
  const speedsSeconds = goal.results.map(result => result.speed / 1000)
  const dates = goal.results.map(result => result.date)
  const targetSeconds = goal.targetProgress / 1000

  function chartData() {
    const targetSpeedArray = new Array(goal.results.length).fill(targetSeconds)
    return {
      labels: dates,
      datasets: [
        {data: speedsSeconds, label: 'Average seconds per note', fill: false, borderColor: 'magenta'},
        {data: targetSpeedArray, label: 'Target', pointRadius: 0, fill: false, borderColor: 'teal'}
      ]
    }
  }

  function chartOptions() {
    return {
      legend: { display: false},
      scales: {
        yAxes: [{
          ticks: {
            min: chartMin()
          }
        }]
      }
    }
  }

  function chartMin() {
    const minSpeed = Math.min(...speedsSeconds)
    console.log('chartMin',Math.floor(Math.min(minSpeed, targetSeconds)) - 0.5)
    return Math.floor(Math.min(minSpeed, targetSeconds)) - 0.5
  }

  return (
    <div>
      <Line data={chartData(goal)} options={chartOptions()} />
    </div>
  )
}
