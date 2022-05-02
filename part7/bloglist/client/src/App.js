import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteBlogAction,
  initializeBlogs,
  updateBlogAction,
} from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector((state) => state.blogs)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong credentials', 'alert', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLike = () => {
    dispatch(
      updateBlogAction({
        id: blogDetails.id,
        likes: blogDetails.likes + 1,
      })
    )
  }

  const handleDeleteBlog = () => {
    window.confirm(`Remove ${blogDetails.title} by ${blogDetails.author}`) &&
      dispatch(deleteBlogAction(blogDetails.id)).then(navigate('./'))
  }

  const matchBlog = useMatch('/blogs/:id')
  const blogDetails = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  return (
    <>
      <Menu user={user} logout={handleLogout} />
      <h1>Blogs</h1>
      <Notification />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleLogin}
        />
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
          <Route
            path={`/blogs/:id`}
            element={
              <Blog
                blog={blogDetails}
                user={user}
                handleDeleteBlog={handleDeleteBlog}
                handleLike={handleLike}
              />
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path={`/users/:id`} element={<User blogs={blogs} />} />
        </Routes>
      )}
    </>
  )
}

export default App
