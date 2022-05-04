import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const loggedUserSlice = createSlice({
  name: 'loggedInUser',
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload
    },
  },
})

export const { setLoggedUser } = loggedUserSlice.actions

export const initializeLoggedInUser = (user) => {
  return async (dispatch) => {
    const loggedInUser = await loginService.login(user)
    blogService.setToken(loggedInUser.token)
    window.localStorage.setItem(
      'loggedBlogappUser',
      JSON.stringify(loggedInUser)
    )
    dispatch(setLoggedUser(loggedInUser))
  }
}

export const keepUserSessionAlive = (user) => {
  return (dispatch) => {
    blogService.setToken(user.token)
    dispatch(setLoggedUser(user))
  }
}

export const userLoggedOutAction = () => {
  return (dispatch) => {
    dispatch(setLoggedUser(null))
  }
}

export default loggedUserSlice.reducer
