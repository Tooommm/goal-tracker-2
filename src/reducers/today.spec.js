import { isoDate } from '../lib/helpers'
import reducer from './today'

describe('Today’s date reducer', () => {
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = isoDate(new Date())

    expect(reducer(initialState, {})).toBe(expectedState)
  })
})
