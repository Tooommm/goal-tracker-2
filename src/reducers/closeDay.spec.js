// Historisation quotidienne (tests)
// =================================

import { isoDate } from '../lib/helpers'
import reducer, { closeDay } from './closeDay'

describe('Close Day reducer', () => {
  it('should properly add the current progressions to the history and reset for a new day', () => {
    const initialState = {
      goals: [
        { id: 1, target: 5 },
        { id: 2, target: 10 },
        { id: 3, target: 15 },
      ],
      history: [{ date: '2017-02-16', progresses: { 1: [2, 5] } }],
      today: '2017-02-17',
      todaysProgress: { 2: 4, 3: 10 },
    }

    const expectedState = {
      goals: initialState.goals,
      history: [
        { date: initialState.today, progresses: { 2: [4, 10], 3: [10, 15] } },
        ...initialState.history,
      ],
      today: isoDate(new Date()),
      todaysProgress: {},
    }

    expect(reducer(initialState, closeDay())).toEqual(expectedState)
  })
})
