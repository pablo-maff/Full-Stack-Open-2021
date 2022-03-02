import Blog from "./Blog";

const Blogs = ({ blogs, user }) => ( 
  blogs.map(blog =>
    <Blog key={blog.id} blog={blog} user={user} />
  ))


export default Blogs