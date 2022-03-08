import { createSlice } from "@reduxjs/toolkit"

const initialState = `Message`

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      return state
    }
  }
})

export const { notify } = notificationSlice.actions
export default notificationSlice.reducer