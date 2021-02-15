import reducer, { progressOnGoal } from './todaysProgress'

describe('Today’s Progress reducer', () => {
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = {}

    expect(reducer(initialState, {})).toEqual(expectedState)
  })

  it('should handle goal progression', () => {
    let initialState = {}

    // 1. Progression à incrément explicite, sur départ vide
    let expectedState = { 1: 2 }
    expect(reducer(initialState, progressOnGoal(1, 2))).toEqual(expectedState)

    // 2. Progression à incrément implicite, sur départ vide
    expectedState = { 1: 1 }
    expect(reducer(initialState, progressOnGoal(1))).toEqual(expectedState)

    // 3. Progression à incrément implicite, sur progression existante
    initialState = { 1: 1 }
    expectedState = { 1: 2 }
    expect(reducer(initialState, progressOnGoal(1))).toEqual(expectedState)

    // 4. Progression à incrément implicite, sur progressions autres
    initialState = { 1: 2 }
    expectedState = { 1: 2, 2: 1 }
    expect(reducer(initialState, progressOnGoal(2))).toEqual(expectedState)
  })
})
