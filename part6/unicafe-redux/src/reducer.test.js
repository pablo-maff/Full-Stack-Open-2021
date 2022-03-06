import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  describe('returns appropriate value when', () => {
    let action
    let state
    beforeEach(() => {
      action = {
        good: {type: 'GOOD'},
        ok: {type: 'OK'},
        bad: {type: 'BAD'},
        zero: {type: 'ZERO'}
      }
      
      state = initialState

      deepFreeze(state)
    })

    test('good is incremented', () => {
      const newState = counterReducer(state, action.good)
      
      expect(newState).toEqual({
        good: 1,
        ok: 0,
        bad: 0
      })
    })

    test('ok is incremented', () => {
      const newState = counterReducer(state, action.ok)
      
      expect(newState).toEqual({
        good: 0,
        ok: 1,
        bad: 0
      })
    })

    test('bad is incremented', () => {
      const newState = counterReducer(state, action.bad)
      
      expect(newState).toEqual({
        good: 0,
        ok: 0,
        bad: 1
      })
    })

    test('resets counters to 0', () => {
      let newState = counterReducer(state, action.ok)
      newState = counterReducer(newState, action.good)
      newState = counterReducer(newState, action.bad)
      newState = counterReducer(newState, action.good)
      newState = counterReducer(newState, action.zero)
      
      expect(newState).toEqual(initialState)
    })
  })
})