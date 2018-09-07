export function selectGoal(idx) {
    const goals = this.state.goals.slice()
    for (let goal of goals) {
      goal.current = false
    }
    goals[idx].current = true
    this.setState({ goals, currentGoalIdx: idx })
  }
