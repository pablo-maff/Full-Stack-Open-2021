import { useState } from "react"
import Button from "./Button"

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, user }) => { 
  const [view, setView] = useState(false)

  const toggleView = () => {
     setView(!view)
  }

  return (
    <div style={blogStyle}>
      {view === false ?
        <>
          {blog.title} {blog.author}
          <Button onClick={toggleView} text='View' />
        </>
        : 
        <>
          <div>
            <p>{blog.title} {blog.author}</p> 
            <p>{blog.url}</p>
            <p>
              Likes {blog.likes}
              <Button onClick={null} text='Like' />
            </p>
            <p>{user.name}</p>
            <Button onClick={toggleView} text='Hide' />
          </div>
        </>
      }
    </div>
  )}

export default Blog