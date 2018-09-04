import token from './token'

const baseUrl = "http://musical-app.herokuapp.com"

export async function getUser(userId) {
  const url = `${baseUrl}/${userId}`
  const myHeaders = new Headers()
  myHeaders.append('token', token)

  const user = await fetch(url, { method: 'GET', headers: myHeaders })
  .then(res => res.json())
  .then(res => {
    console.log('Success: ', res)
    return res
  }, err => console.log(err))
  return user
}

export function getGoals(user) {
  const goals = user.goals.map( goal => {
    return {
      title: goal.title,
      targetProgress: goal.targetProgress,
      goalId: goal._id,
      pitches: goal.pitches.map( pitch => pitch.pitchid )
    }
  }).reverse()
  return goals
}

export function saveQuizResults(quizResults, userId, goalId) {
  console.log('saving quiz results . . .')
  const url = `${baseUrl}/${userId}/${goalId}/speedup`

  const myHeaders = new Headers()
  myHeaders.append('token', token)
  myHeaders.append('Content-Type', 'application/json')

  const body = JSON.stringify(quizResults)
  console.log('request body: ', body)

  fetch(url, { method: 'PUT', headers: myHeaders, body: body })
  .then(result => result.json())
  .then(result => {
      console.log('Saved quiz results!')
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
      console.log('Saved goal!')
      console.log(result)
    }
  ).catch(err => console.log(err))
}

export async function destroyGoal(userId, goalId) {
  const url = `${baseUrl}/${userId}/${goalId}/deletegoal`
  const myHeaders = new Headers()
  myHeaders.append('token', token)

  const user = await fetch(url, {method: 'DELETE', headers: myHeaders})
  .then(result => result.json())
  .then(result => {
    console.log('Successfully deleted goal.')
    return result
  })
  .catch(err => console.log(err))
  return user
}
