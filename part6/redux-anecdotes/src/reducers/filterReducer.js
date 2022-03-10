import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
        state = action.payload
        return state
    }
  }
})

export const { setFilter, unSetFilter } = filterSlice.actions
export default filterSlice.reducer