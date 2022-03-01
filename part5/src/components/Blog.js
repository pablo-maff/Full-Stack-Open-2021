const Blog = ({ blog }) => (
  <div>
    {blog.title} from {blog.author} in {blog.url}
  </div>  
)

export default Blog