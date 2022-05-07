import { useEffect, useState } from 'react'
import CommentForm from './CommentForm'
import commentService from '../services/comments'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { appendCommentAction } from '../reducers/blogReducer'
import { List, ListItem, ListItemText, Typography } from '@mui/material'

const Comments = ({ blog }) => {
  const [comments, setComments] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    setComments(blog.comments)
  }, [blog])

  const newComment = async (newCommentObj) => {
    newCommentObj = { ...newCommentObj, blogID: blog.id }
    try {
      const createComment = await commentService.create(newCommentObj)
      dispatch(appendCommentAction(createComment))
    } catch (exception) {
      dispatch(setNotification('Error creating comment', 'alert', 5))
    }
  }

  return (
    <>
      <div>
        <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
          Comments
        </Typography>
        <CommentForm newComment={newComment} />
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemText primary={comment.content} />
            </ListItem>
          ))}
        </List>
      </div>
    </>
  )
}

export default Comments
