import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotify(state, action) {
      if (state !== null) {
        clearTimeout(state.timeoutID)
      }
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    unSetNotify(state, action) {
      return null
    },
  },
})

export const { setNotify, unSetNotify } = notificationSlice.actions

export const setNotificationRedux = (message, type, time) => {
  return (dispatch) => {
    const toMiliseconds = time * 1000
    const timeoutID = setTimeout(() => dispatch(unSetNotify()), toMiliseconds)
    const notification = { message, type, timeoutID }
    dispatch(setNotify(notification))
  }
}

export default notificationSlice.reducer
