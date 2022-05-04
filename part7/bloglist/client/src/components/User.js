import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const [user, setUser] = useState(null)

  const userID = useParams().id
  const findUser = useSelector(({ users }) =>
    users.find((user) => user.id === userID)
  )
  useEffect(() => {
    setUser(findUser)
  }, [findUser])

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
