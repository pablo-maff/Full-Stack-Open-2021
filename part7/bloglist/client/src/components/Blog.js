import Button from './Button'
import Comments from './Comments'

const Blog = ({ blog, user, handleLike, handleDeleteBlog }) => {
  if (!blog) return null

  return (
    <>
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
    </>
  )
}

export default Blog
