import { Button, TextField } from '@mui/material'
import { useState } from 'react'

const CommentForm = ({ newComment }) => {
  const [content, setContent] = useState('')

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleNewComment = async (e) => {
    e.preventDefault()

    newComment({
      content,
    })

    setContent('')
  }

  return (
    <form>
      <TextField
        multiline
        type="content"
        variant="outlined"
        label="leave a comment"
        value={content}
        name="Content"
        onChange={handleContentChange}
        id="comment-content"
        sx={{ mb: 1 }}
        fullWidth
      />
      <Button onClick={handleNewComment} variant="contained" sx={{ ml: 1 }}>
        Add Comment
      </Button>
    </form>
  )
}

export default CommentForm
