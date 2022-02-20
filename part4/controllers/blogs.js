const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  blogs ?
    response.json(blogs)
    : response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedPost = await blog.save()
  response.status(201).json(savedPost)
})

module.exports = blogsRouter