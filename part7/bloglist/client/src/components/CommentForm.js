import { useState } from 'react'
import Button from './Button'

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
    <form onSubmit={handleNewComment}>
      <input
        type="content"
        value={content}
        name="Content"
        onChange={handleContentChange}
        id="comment-content"
      />
      <Button type="submit" text="Add Comment" />
    </form>
  )
}

export default CommentForm
