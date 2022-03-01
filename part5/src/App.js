import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Blogs from './components/Blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  const handleNewBlog = async event => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url
      })

      setBlogs(blogs.concat(newBlog))
      notify(`A new blog ${title} by ${author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      notify('Title must be provided', 'alert')
    }
  }

  return (
    <>
      <h1>Blogs</h1>
      <Notification notification={notification}/>
    {user === null ?
      <Togglable buttonLabel='login'>
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
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel='new blog'>
          <BlogForm 
            onSubmit={handleNewBlog}
            title={title}
            handleTitle={handleTitleChange}
            author={author}
            handleAuthor={handleAuthorChange}
            url={url}
            handleUrl={handleUrlChange}
          />
        </Togglable>
        <Blogs blogs={blogs} />
      </div>
    }
  </>
  )
}

export default App