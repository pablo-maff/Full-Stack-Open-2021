import { Link } from 'react-router-dom'
import Button from './Button'

const Menu = ({ user, logout }) => {
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
          <Button onClick={logout} text="Logout" />
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
