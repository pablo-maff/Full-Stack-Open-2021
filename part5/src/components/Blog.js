import { useState } from "react"
import Button from "./Button"
import Togglable from "./Togglable"

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog }) => { 
  const [view, setView] = useState(false)

  const toggleView = () => {
     setView(!view)
  }
  console.log(view);

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
            <p>{blog.likes}</p>
            <p></p>
            <Button onClick={toggleView} text='Hide' />
          </div>
        </>
      }
      {/* {view ? 
        <Button onClick={toggleButton} text='hide' />
        : <Button onClick={toggleButton} text='view' />
        {blog.title} {blog.author}
      } */}
    </div>
  )}

export default Blog