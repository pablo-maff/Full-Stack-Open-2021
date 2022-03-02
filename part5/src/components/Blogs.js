import Blog from "./Blog";

const Blogs = ({ blogs, user, updateBlog }) => ( 
  blogs.map(blog =>
    <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} />
  ))


export default Blogs