import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { appendUserBlog } from './usersReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    appendComment(state, action) {
      const { blogID, ...comment } = action.payload
      return state.map((blog) =>
        blog.id !== blogID
          ? blog
          : { ...blog, comments: [...blog.comments, comment] }
      )
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog, appendComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
      dispatch(appendUserBlog(newBlog))
      dispatch(
        setNotification(
          `A new blog ${content.title} by ${content.author} added`,
          'success',
          5
        )
      )
    } catch (exception) {
      dispatch(setNotification('Title and URL must be provided', 'alert', 5))
    }
  }
}

export const updateBlogAction = (fieldsToUpdate) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(fieldsToUpdate)
      dispatch(updateBlog(updatedBlog))
    } catch (exception) {
      dispatch(
        setNotification(
          "Can't give like right now, please try again later",
          'alert',
          5
        )
      )
    }
  }
}

export const deleteBlogAction = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch(deleteBlog(id))
    } catch (exception) {
      dispatch(
        setNotification(
          'There has been some error trying to delete this blog',
          'alert',
          5
        )
      )
    }
  }
}

export const appendCommentAction = (blogComment) => {
  return async (dispatch) => {
    dispatch(appendComment(blogComment))
  }
}

export default blogSlice.reducer
