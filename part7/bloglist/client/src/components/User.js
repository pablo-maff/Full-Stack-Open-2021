import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'

const User = ({ blogs }) => {
  const [user, setUser] = useState([])

  const userID = useParams().id

  useEffect(async () => {
    const userData = await userService.getUser(userID)
    setUser(userData)
  }, [])

  const userBlogs = blogs.filter((blog) => blog.user.id === user.id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
