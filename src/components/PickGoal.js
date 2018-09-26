import React from 'react'
import { Link } from 'react-router-dom'
import '../css/pickgoal.css'

export default function PickGoal({ userId, currentGoalIdx, goals, selectGoal }) {

  function toggleListVisibility(list) {
    list.classList.toggle('hidden')
  }

  function currentClass(idx) {
    if (idx === currentGoalIdx) return 'current'
  }

  return (
    <form id="goal-list">
      <ul className="hidden">
      {goals.map( (goal, idx) => {
        return (
          <li className={currentClass(idx)} key={goal.goalId} >
            <label>
              <input
                type="radio"
                name="pick-goal"
                onChange={e => selectGoal(idx)}
                checked={idx === currentGoalIdx}
                onClick={e => toggleListVisibility(e.target.parentElement.parentElement.parentElement)}
              />{goal.title}
            </label>
          </li>
        )
      })}
        <li>
          <Link to={'/user/' + userId + '/goal/new'}>
            Set a new goal
          </Link>
        </li>
      </ul>
      <div 
        className="showListButton"
        onClick={e => toggleListVisibility(e.currentTarget.previousElementSibling)}
      >
        <span>⌃</span>
      </div>
    </form>
  )
}
