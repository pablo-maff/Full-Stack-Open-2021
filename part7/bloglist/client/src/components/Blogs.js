import { Link } from 'react-router-dom'
const Blogs = ({ blogs }) => {
  // blogs.sort((a, b) => b.likes - a.likes)

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
  // blogs.map((blog) => (
  //   <Blog
  //     key={blog.id}
  //     blog={blog}
  //     updateBlog={updateBlog}
  //     deleteBlog={deleteBlog}
  //     user={user}
  //   />
  // ))
}

export default Blogs
