import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Button from './components/Button'
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

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
      notify('wrong credentials', 'alert')
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
      notify(`A new blog ${createBlog.title} by ${createBlog.author} added`)
    } catch (exception) {
      notify('Title must be provided', 'alert')
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject)
    } catch (exception) {
      notify('There has been some error trying to update this blog', 'alert')
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (exception) {
      notify('There has been some error trying to delete this blog', 'alert')
    }
  }

  const blogFormRef = useRef()

  return (
    <>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      {user === null ? (
        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <>
          <p>{user.name} logged-in</p>
          <Button onClick={handleLogout} text="Logout" />
        </>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                <BlogForm newBlog={newBlog} />
              </Togglable>
              <div className="blogs">
                <Blogs
                  blogs={blogs}
                  user={user}
                  updateBlog={updateBlog}
                  deleteBlog={deleteBlog}
                />
              </div>
            </>
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  )
}

export default App
