import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [view, setView] = useState(false)
  const [updated, setUpdated] = useState(false)

  const handleLikes = (blog) => {
    blog.likes += 1
    setUpdated(!updated)
    updateBlog(blog)
  }

  const handleDelete = blog => {
    window.confirm(
      `Remove ${blog.title} by ${blog.author}`
    )
      && deleteBlog(blog.id)
  }

  const toggleView = () => {
    setView(!view)
  }

  return (
    <div className='blog'>
      {view === false ?
        <>
          {blog.title} {blog.author}
          <Button onClick={toggleView} text='View' />
        </>
        :
        <>
          <div>
            <p>
              {blog.title} {blog.author}
              <Button onClick={toggleView} text='Hide' />
            </p>
            <p>{blog.url}</p>
            <p>
              Likes {blog.likes}
              <Button onClick={() => handleLikes(blog)} text='Like' />
            </p>
            <p>{blog.user.name}</p>
            {blog.user.name === user.name ?
              <Button onClick={() => handleDelete(blog)} text='Remove' />
              : null
            }
          </div>
        </>
      }
    </div>
  )}

export default Blog