import reducer, { clearHistory } from './history'

describe('History reducer', () => {
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = []

    expect(reducer(initialState, {})).toEqual(expectedState)
  })

  it('should handle clearing', () => {
    const initialState = [{}, {}, {}]
    const expectedState = []

    expect(reducer(initialState, clearHistory())).toEqual(expectedState)
  })
})
