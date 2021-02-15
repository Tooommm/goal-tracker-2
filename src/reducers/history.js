const CLEAR_HISTORY = 'goal-tracker/history/HISTORY_CLEAR'

export default function reduceHistory(state = [], action) {
  switch (action.type) {
    case CLEAR_HISTORY:
      return []

    default:
      return state
  }
}

export function clearHistory() {
  return { type: CLEAR_HISTORY }
}
