import { AppBar, Button, IconButton, Toolbar } from '@mui/material'
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

  const padding = {
    paddingRight: 5,
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>

        {user ? (
          <>
            <em style={padding}>{user.name} logged in</em>
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
