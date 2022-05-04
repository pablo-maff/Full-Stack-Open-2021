import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'
import loggedUserReducer from './reducers/loggedUserReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    users: usersReducer,
    loggedInUser: loggedUserReducer,
  },
})

export default store
