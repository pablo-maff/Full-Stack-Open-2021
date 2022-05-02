import Button from './Button'
import Comments from './Comments'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  if (!blog) return null
  const handleLikes = () => {
    const likedBlog = { ...blog, likes: (blog.likes += 1) }
    updateBlog(likedBlog)
  }
  const handleDelete = (blog) => {
    window.confirm(`Remove ${blog.title} by ${blog.author}`) &&
      deleteBlog(blog.id)
  }

  return (
    <>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        Likes {blog.likes}
        <Button onClick={handleLikes} text="Like" />
      </p>
      <p>added by {blog.user.name}</p>
      {blog.user.name === user.name ? (
        <Button onClick={() => handleDelete(blog)} text="Remove" />
      ) : null}
      <Comments blog={blog} />
    </>
  )
}

export default Blog
