const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  blogs ?
    res.status(200).json(blogs)
    : res.status(404).end()
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  blog ? 
    res.status(200).json(blog.toJSON())
    : res.status(404).end()
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  if (!blog.title && !blog.url) {
    res.status(400).end()
  } else{
    const savedPost = await blog.save()
    res.status(201).json(savedPost)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter