import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Button from './components/Button'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleLogin = async event => {
    event.preventDefault()
    console.log('Logging in with', username, password);
  
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('Wrong Username or Password', 'alert')
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    //setAddBlogVisible(false)
  }

  const newBlog = async blogObject => {
    try {
      const createBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(createBlog))
      notify(`A new blog ${createBlog.title} by ${createBlog.author} added`)
    } catch (exception) {
      notify('Title must be provided', 'alert')
    }
  }

  return (
    <>
      <h1>Blogs</h1>
      <Notification notification={notification}/>
    {user === null ?
      <Togglable buttonLabel='Login'>
        <LoginForm 
          handleLogin={handleLogin} 
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      </Togglable> :
      <div>
        <p>{user.name} logged-in</p>
        <Button onClick={handleLogout} text='Logout' />
        <Togglable buttonLabel='New Blog'>
          <BlogForm newBlog={newBlog} />
        </Togglable>
        <Blogs blogs={blogs} />
      </div>
    }
  </>
  )
}

export default App