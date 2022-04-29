import { useEffect, useState } from 'react'
import CommentForm from './CommentForm'
import commentService from '../services/comments'

const Comments = ({ blog, notify }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    setComments(blog.comments)
  }, [])

  const newComment = async (newCommentObj) => {
    newCommentObj = { ...newCommentObj, blogID: blog.id }
    try {
      const createComment = await commentService.create(newCommentObj)
      setComments(comments.concat({ ...createComment }))
    } catch (exception) {
      notify('Error creating comment', 'alert')
    }
  }

  return (
    <>
      <div>
        <h3>Comments</h3>
        <CommentForm newComment={newComment} />
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Comments
