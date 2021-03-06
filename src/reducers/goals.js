const ObjectId = require('bson-objectid')

const ADD_GOAL = 'goal-tracker/goals/GOALS_ADD'
const REMOVE_GOAL = 'goal-tracker/goals/GOALS_DEL'
const UPDATE_GOAL = 'goal-tracker/goals/GOALS_UPDATE'

export default function reduceGoals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL: {
      const { name, target, units } = action.payload

      const id = ObjectId.generate()

      return [...state, { id, name, target, units }]
    }

    case REMOVE_GOAL:
      return state.filter(({ id }) => id !== action.payload.id)

    case UPDATE_GOAL: {
      return state.map((goal) =>
        goal.id === action.payload.id ? action.payload : goal
      )
    }

    default:
      return state
  }
}

export function addGoal(name, target, units) {
  return { type: ADD_GOAL, payload: { name, target, units } }
}

export function removeGoal(id) {
  return { type: REMOVE_GOAL, payload: { id } }
}

export function updateGoal(id, name, target, units) {
  return { type: UPDATE_GOAL, payload: { id, name, target, units } }
}
