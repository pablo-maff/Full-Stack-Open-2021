import Blog from "./Blog";

const Blogs = ({ blogs, user, updateBlog, deleteBlog }) => { 
  blogs.sort((a, b) => b.likes - a.likes)

  return (
  blogs.map(blog =>
    <Blog 
      key={blog.id} 
      blog={blog} 
      user={user} 
      updateBlog={updateBlog}
      deleteBlog={deleteBlog}
    />
  ))
}


export default Blogs