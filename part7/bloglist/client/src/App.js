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
import { Typography, Container, Grid } from '@mui/material'

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
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Menu />
      <Typography
        variant="h2"
        component="h1"
        color="darkblue"
        sx={{ mt: 2, mb: 2 }}
      >
        Blogs
      </Typography>
      {user === null ? (
        <LoginForm />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Grid container>
                  <Grid item md={3} sm={5} xs={7}>
                    <Togglable buttonLabel="New Blog">
                      <BlogForm />
                    </Togglable>
                  </Grid>
                </Grid>
                <div className="blogs">
                  <Blogs />
                </div>
                <Notification />
              </>
            }
          />
          <Route path={`/blogs/:id`} element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path={`/users/:id`} element={<User />} />
        </Routes>
      )}
    </Container>
  )
}

export default App
