import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteBlogAction, updateBlogAction } from '../reducers/blogReducer'
import { deleteUserBlog } from '../reducers/usersReducer'
import Comments from './Comments'

const Blog = () => {
  const [blog, setBlog] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(({ loggedInUser }) => loggedInUser)

  const { id } = useParams()
  const findBlog = useSelector(({ blogs }) =>
    blogs.find((blog) => blog.id === id)
  )

  useEffect(() => {
    setBlog(findBlog)
  }, [findBlog])

  if (!blog) return null

  const handleLike = () => {
    dispatch(
      updateBlogAction({
        id: blog.id,
        likes: blog.likes + 1,
      })
    )
  }

  const handleDeleteBlog = () => {
    window.confirm(`Remove ${blog.title} by ${blog.author}`) &&
      dispatch(deleteUserBlog({ blogID: blog.id, userID: blog.user.id })) &&
      dispatch(deleteBlogAction(blog.id)).then(navigate('/'))
  }

  return (
    <div>
      <Typography variant="h4" color="secondary">
        {blog.title} by {blog.author}
      </Typography>
      <Button href={blog.url} sx={{ mt: 1 }}>
        {blog.url}
      </Button>
      <Typography sx={{ mt: 1 }}>
        Likes {blog.likes}
        <Button onClick={handleLike} variant="contained" sx={{ ml: 1 }}>
          Like
        </Button>
      </Typography>
      <Typography sx={{ mt: 2, mb: 2 }}>
        added by <Link to={`/users/${blog.user.id}`}>{user.name}</Link>
      </Typography>
      {blog.user.name === user.name ? (
        <Button onClick={handleDeleteBlog} variant="outlined">
          Delete
        </Button>
      ) : null}
      <Comments blog={blog} />
    </div>
  )
}

export default Blog
