import { subDays } from 'date-fns'

import { closeDay } from './closeDay'
import { isoDate } from '../lib/helpers'
import reducer from './index'

describe('Store-level reducer', () => {
  it('should properly accrue its initial state', () => {
    const initialState = undefined
    const expectedState = {
      currentUser: { loginState: 'logged-out' },
      goals: [],
      history: [],
      today: isoDate(new Date()),
      todaysProgress: {},
    }

    expect(reducer(initialState, {})).toEqual(expectedState)
  })

  it('should handle day closing', () => {
    const initialState = {
      currentUser: { loginState: 'logged-out' },
      goals: [
        { id: 1, target: 42 },
        { id: 2, target: 21 },
      ],
      history: [
        {
          date: isoDate(subDays(new Date(), 2)),
          progresses: { 1: [15, 42] },
        },
      ],
      today: isoDate(subDays(new Date(), 1)),
      todaysProgress: { 1: 10 },
    }
    const expectedState = {
      currentUser: initialState.currentUser,
      goals: initialState.goals,
      history: [
        { date: initialState.today, progresses: { 1: [10, 42] } },
        ...initialState.history,
      ],
      today: isoDate(new Date()),
      todaysProgress: {},
    }

    expect(reducer(initialState, closeDay())).toEqual(expectedState)
  })
})
