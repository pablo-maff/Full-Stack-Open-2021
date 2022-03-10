import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setLikeNotify: {
      reducer: (state, action) => {
        state = action.payload
        return state
      },
      prepare: (anecdote) => {
        return { payload: `Liked: ${anecdote}`}
      }  
    },
    setNewAnecdoteNotify: {
      reducer: (state, action) => {
        state = action.payload
        return state
      },
      prepare: (anecdote) => {
        return { payload: `Created: ${anecdote}`}
      }  
    },
    unSetNotify(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { setLikeNotify, setNewAnecdoteNotify, unSetNotify } = notificationSlice.actions
export default notificationSlice.reducer