import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { keepUserSessionAlive } from './reducers/loggedUserReducer'

const App = () => {
  const user = useSelector(({ loggedInUser }) => loggedInUser)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(keepUserSessionAlive(user))
    }
  }, [])

  return (
    <>
      <Menu />
      <Notification />
      <h1>Blogs</h1>
      {user === null ? (
        <LoginForm />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Togglable buttonLabel="New Blog">
                  <BlogForm />
                </Togglable>
                <div className="blogs">
                  <Blogs />
                </div>
              </>
            }
          />
          <Route path={`/blogs/:id`} element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path={`/users/:id`} element={<User />} />
        </Routes>
      )}
    </>
  )
}

export default App
