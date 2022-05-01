import { useEffect, useState } from 'react'
import CommentForm from './CommentForm'
import commentService from '../services/comments'
import { useDispatch } from 'react-redux'
import { setNotificationRedux } from '../reducers/notificationReducer'

const Comments = ({ blog }) => {
  const [comments, setComments] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    setComments(blog.comments)
  }, [])

  const newComment = async (newCommentObj) => {
    newCommentObj = { ...newCommentObj, blogID: blog.id }
    try {
      const createComment = await commentService.create(newCommentObj)
      setComments(comments.concat({ ...createComment }))
    } catch (exception) {
      dispatch(setNotificationRedux('Error creating comment', 'alert', 5))
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
