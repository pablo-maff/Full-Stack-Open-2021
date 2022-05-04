import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteBlogAction, updateBlogAction } from '../reducers/blogReducer'
import { deleteUserBlog } from '../reducers/usersReducer'
import Button from './Button'
import Comments from './Comments'

const Blog = ({ user }) => {
  const [blog, setBlog] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        Likes {blog.likes}
        <Button onClick={handleLike} text="Like" />
      </p>
      <p>added by {blog.user.name}</p>
      {blog.user.name === user.name ? (
        <Button onClick={handleDeleteBlog} text="Remove" />
      ) : null}
      <Comments blog={blog} />
    </div>
  )
}

export default Blog
