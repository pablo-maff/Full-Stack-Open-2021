import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, TextField } from '@mui/material'

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
      <form>
        <TextField
          fullWidth
          required
          multiline
          type="title"
          label="Title"
          color="secondary"
          value={title}
          onChange={handleTitleChange}
          id="blog-title"
          margin="dense"
        />
        <TextField
          fullWidth
          type="author"
          label="Auhor"
          color="secondary"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
          id="blog-author"
          margin="dense"
        />
        <TextField
          fullWidth
          required
          type="url"
          label="URL"
          color="secondary"
          value={url}
          name="URL"
          onChange={handleUrlChange}
          id="blog-url"
          margin="dense"
        />
        <Button
          onClick={createNewBlog}
          variant="contained"
          color="secondary"
          sx={{ mb: 1 }}
        >
          Create
        </Button>
      </form>
    </>
  )
}

export default BlogForm
