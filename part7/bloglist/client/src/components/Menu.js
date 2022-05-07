import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLoggedOutAction } from '../reducers/loggedUserReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ loggedInUser }) => loggedInUser)

  const navigate = useNavigate()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(userLoggedOutAction())
    navigate('/')
  }

  return (
    <AppBar position="static" sx={{ display: 'flex' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>

        {user ? (
          <>
            <Typography>{user.name} logged in</Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Menu
