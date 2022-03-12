import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotify(state, action) {
      return action.payload
    },
    unSetNotify(state, action) {
      return action.payload
    }
  }
})

export const { setNotify, unSetNotify } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    const toMiliseconds = time * 1000
    dispatch(setNotify(message))
    setTimeout(() => {dispatch(unSetNotify(''))}, toMiliseconds)
  }
}

export default notificationSlice.reducer