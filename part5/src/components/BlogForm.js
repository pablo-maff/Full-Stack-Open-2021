import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const BlogForm = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  const handleNewBlog = event => {
    event.preventDefault()

    newBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <div>
        <h2>Create a new blog</h2>
        <form onSubmit={handleNewBlog}>
          <div>
            Title:
            <input
              type='title'
              value={title}
              name='Title'
              onChange={handleTitleChange}
            />
          </div>
          <div>
            Author:
            <input
              type='author'
              value={author}
              name='Author'
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            URL:
            <input
              type='url'
              value={url}
              name='URL'
              onChange={handleUrlChange}
            />
          </div>
          <Button type='submit' text='Create' />
        </form>
      </div>
    </>
  )
}

BlogForm.propTypes = {
  handleTitleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default BlogForm