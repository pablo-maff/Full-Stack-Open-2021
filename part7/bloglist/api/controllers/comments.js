const commentsRouter = require('express').Router()

const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', (req, res) => {
  Comment.find({}).then((comments) => {
    res.json(comments)
  })
})

commentsRouter.post('/', async (req, res) => {
  const body = req.body

  const id = body.blogID
  const commentedBlog = await Blog.findById(id)

  const comment = new Comment({
    content: body.content,
    blogID: body.blogID,
  })

  const savedComment = await comment.save()
  console.log('commentedBlog', commentedBlog)
  commentedBlog.comments = commentedBlog.comments.concat(savedComment)
  await commentedBlog.save()
  res.json(savedComment)
})

module.exports = commentsRouter
