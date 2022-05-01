import React, { useState, useEffect, useRef } from 'react'
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
import { setNotificationRedux } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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
      dispatch(setNotificationRedux('wrong credentials', 'alert', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const newBlog = async (blogObject) => {
    try {
      const createBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat({ ...createBlog, user: user }))
      blogFormRef.current.toggleVisibility()
      dispatch(
        setNotificationRedux(
          `A new blog ${createBlog.title} by ${createBlog.author} added`,
          'success',
          5
        )
      )
    } catch (exception) {
      dispatch(setNotificationRedux('Title must be provided', 'alert', 5))
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject)

      setBlogs(
        blogs.map((blog) => (blog.id === blogObject.id ? blogObject : blog))
      )
    } catch (exception) {
      dispatch(
        setNotificationRedux(
          "Can't give like right now, please try later",
          'alert',
          5
        )
      )
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      navigate('./')
    } catch (exception) {
      dispatch(
        setNotificationRedux(
          'There has been some error trying to delete this blog',
          'alert',
          5
        )
      )
    }
  }

  const blogFormRef = useRef()

  const match = useMatch('/blogs/:id')
  const blogDetails = match
    ? blogs.find((blog) => blog.id === match.params.id)
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
                <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                  <BlogForm newBlog={newBlog} />
                </Togglable>
                <div className="blogs">
                  <Blogs blogs={blogs} />
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
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
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
