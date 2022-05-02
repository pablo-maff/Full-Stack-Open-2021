import { useState } from 'react'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const createNewBlog = async (e) => {
    e.preventDefault()
    dispatch(createBlog({ title, author, url }))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>New blog</h2>
      <form onSubmit={createNewBlog}>
        <div>
          Title:
          <input
            type="title"
            value={title}
            name="Title"
            onChange={handleTitleChange}
            id="blog-title"
          />
        </div>
        <div>
          Author:
          <input
            type="author"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            id="blog-author"
          />
        </div>
        <div>
          URL:
          <input
            type="url"
            value={url}
            name="URL"
            onChange={handleUrlChange}
            id="blog-url"
          />
        </div>
        <Button type="submit" text="Create" />
      </form>
    </>
  )
}

export default BlogForm
