const PROGRESS = 'goal-tracker/todaysProgress/PROGRESS'

export default function reduceTodaysProgress(state = {}, action) {
  switch (action.type) {
    case PROGRESS: {
      const { goalId, increment } = action.payload
      const previous = state[goalId] || 0

      return { ...state, [goalId]: previous + increment }
    }

    default:
      return state
  }
}

export function progressOnGoal(goalId, increment = 1) {
  increment = Number(increment) || 0
  return { type: PROGRESS, payload: { goalId, increment } }
}
