import { Link } from 'react-router-dom'
const Blogs = ({ blogs }) => {
  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      ))}
    </>
  )
}

export default Blogs
