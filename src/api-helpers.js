import token from './token'

const baseUrl = "http://musical-app.herokuapp.com"

export function saveQuizResults(quizResults, userId, goalId) {
  const url = `${baseUrl}/${userId}/${goalId}/speedup`

  const myHeaders = new Headers()
  myHeaders.append('token', token)
  myHeaders.append('Content-Type', 'application/json')

  const body = JSON.stringify(quizResults)
  console.log('request body: ', body)

  fetch(url, { method: 'PUT', headers: myHeaders, body: body })
  .then(result => result.json())
  .then(result => {
      console.log('Saved quiz results!', result.status)
      console.log(result)
    }
  ).catch(err => console.log(err))
}

export function saveGoal(goal, userId) {
  const url = `${baseUrl}/${userId}/newgoal`
  const myHeaders = new Headers()
  myHeaders.append('token', token)
  myHeaders.append('Content-Type', 'application/json')
  const body = JSON.stringify(goal)

  fetch(url, { method: 'POST', headers: myHeaders, body: body })
  .then(result => result.json())
  .then(result => {
      console.log('Saved goal! ', result.status)
      console.log(result)
    }
  ).catch(err => console.log(err))
}
