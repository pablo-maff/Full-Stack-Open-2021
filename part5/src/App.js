import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in with', username, password);
  
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception);
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}  
          />
        </div>
        <button type='submit'>login</button>
      </form>
  )

  const getBlogs = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
  ))

  if (user === null) {
    return (
    <>
      <h1>Log in to Application</h1>
        {loginForm()}
    </>
    )
  }
  
  return (      
    <div>
      <h1>Blogs</h1>
      <p>{user.name} logged-in</p>
      {getBlogs()}
    </div>
  )
}

export default App