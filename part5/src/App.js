import React, { useState, useEffect, useRef } from 'react'
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

  const handleLogin = async logInObject => {
    try {
      const user = await loginService.login(logInObject)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
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
      blogs.concat(createBlog)
      setBlogs(await blogService.getAll())
      blogFormRef.current.toggleVisibility()
      notify(`A new blog ${createBlog.title} by ${createBlog.author} added`)
    } catch (exception) {
      notify('Title must be provided', 'alert')
    }
 }


  const updateBlog = async blogObject => {
    try {
      await blogService.update(blogObject)
    } catch (exception) {
      notify('There has been some error trying to update this blog', 'alert')
    }
  }

  const deleteBlog = async id => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(
        blog => blog.id !== id
      ))
    } catch (exception) {
      notify('There has been some error trying to delete this blog', 'alert')
    }
  }

  const blogFormRef = useRef()

  return (
    <>
      <h1>Blogs</h1>
      <Notification notification={notification}/>
    {user === null ?
      <Togglable buttonLabel='Login'>
        <LoginForm login={handleLogin} />
      </Togglable> :
      <div>
        <p>{user.name} logged-in</p>
        <Button onClick={handleLogout} text='Logout' />
        <Togglable buttonLabel='New Blog' ref={blogFormRef}>
          <BlogForm newBlog={newBlog} />
        </Togglable>
        <Blogs blogs={blogs} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      </div>
    }
  </>
  )
}

export default App