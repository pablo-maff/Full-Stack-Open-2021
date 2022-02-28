import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

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
    setAddBlogVisible(false)
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

  const Notification = ({ notification }) => {
    if (notification === null) {
      return null
    }

    const style = {
      color: notification.type === 'alert' ? 'red' : 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    return (
      <div style={style}>
        {notification.message}
      </div>
    )
  }

  const getBlogs = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
  ))

  const createBlogForm = () => {
    
    return (
      <>
        <div style={hideWhenVisible}>
          <button onClick={() => setAddBlogVisible(true)}>New Blog</button>
        </div>
        <div style={showWhenVisible}>
          <form onSubmit={handleNewBlog}>
            <div>
              Title:
              <input
              type='title'
              value={title}
              name='Title'
              onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              Author:
              <input
              type='author'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              URL:
              <input
              type='url'
              value={url}
              name='URL'
              onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type='submit'>Create</button>
          </form>
          <button onClick={() => setAddBlogVisible(false)}>Cancel</button>
        </div>
      </>
  )}

  if (user === null) {
    return (
    <>
      <Notification notification={notification}/>
      <LoginForm handleLogin={handleLogin} 
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        username={username}
        password={password}
      />
    </>
    )
  }

  return (      
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification}/>
      <p>{user.name} logged-in</p>
      <button onClick={handleLogout}>logout</button>
      <h2>Create New</h2>
      {createBlogForm()}
      {getBlogs()}
    </div>
  )
}

export default App