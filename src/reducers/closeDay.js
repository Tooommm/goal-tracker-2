import { isoDate } from '../lib/helpers'

const CLOSE_DAY = 'goal-tracker/closeDay/CLOSE_DAY'

export default function reduceCloseDay(state, action) {
  switch (action.type) {
    case CLOSE_DAY:
      return {
        ...state,

        history: tallyPreviousDay(state),

        today: isoDate(new Date()),
        todaysProgress: {},
      }

    default:
      return state
  }
}

export function closeDay() {
  return { type: CLOSE_DAY }
}

function tallyPreviousDay({ goals, history, today, todaysProgress }) {
  const progresses = {}
  for (const { id, target } of goals) {
    const progress = todaysProgress[id] || 0

    if (progress > 0) {
      progresses[id] = [progress, target]
    }
  }

  if (Object.keys(progresses).length === 0) {
    return history
  }

  return [
    {
      date: today,
      progresses,
    },
    ...history,
  ]
}
