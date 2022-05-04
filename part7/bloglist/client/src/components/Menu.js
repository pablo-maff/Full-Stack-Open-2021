import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLoggedOutAction } from '../reducers/loggedUserReducer'
import Button from './Button'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ loggedInUser }) => loggedInUser)

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(userLoggedOutAction())
  }

  const padding = {
    paddingRight: 5,
  }

  return (
    <div className="menu">
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      {user ? (
        <>
          <em style={padding}>{user.name} logged in</em>
          <Button onClick={handleLogout} text="Logout" />
        </>
      ) : (
        <Link style={padding} to="/">
          Login
        </Link>
      )}
    </div>
  )
}

export default Menu
