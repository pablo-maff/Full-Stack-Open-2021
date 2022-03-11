import { createSlice } from "@reduxjs/toolkit"
import { getAll, createNew, vote } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateVote(state, action) {
      const id = action.payload.id
      const changedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { 
  updateVote,
  appendAnecdote,
  setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const toVote = await vote(anecdote)
    dispatch(updateVote(toVote))
  }
}

export default anecdoteSlice.reducer