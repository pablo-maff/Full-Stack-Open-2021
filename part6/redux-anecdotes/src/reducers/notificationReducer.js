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

let timeoutID

export const setNotification = (message, time) => {
  return dispatch => {
    const toMiliseconds = time * 1000
    dispatch(setNotify(message))
    timeoutID = setTimeout(() => {dispatch(unSetNotify(''))}, toMiliseconds)
  }
}

export const clearMessage = () => clearTimeout(timeoutID)

export default notificationSlice.reducer