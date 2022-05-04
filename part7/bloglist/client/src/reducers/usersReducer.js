import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      // eslint-disable-next-line no-unused-vars
      const { user, comments, likes, ...blog } = action.payload
      const { id } = user
      return state.map((user) =>
        user.id !== id ? user : { ...user, blogs: [...user.blogs, blog] }
      )
    },
    deleteBlog(state, action) {
      const { blogID, userID } = action.payload
      return state.map((user) =>
        user.id !== userID
          ? user
          : {
              ...user,
              blogs: user.blogs.filter((blog) => blog.id !== blogID),
            }
      )
    },
  },
})

export const { setUsers, appendBlog, deleteBlog } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const appendUserBlog = (blog) => {
  return async (dispatch) => {
    dispatch(appendBlog(blog))
  }
}

export const deleteUserBlog = (blogObject) => {
  return async (dispatch) => {
    dispatch(deleteBlog(blogObject))
  }
}

export default usersSlice.reducer
