const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = req => {
//   const authorization = req.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1})
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
  const { title, author, url, likes } = req.body
  
  if (!title && !url) {
    res.status(400).end()
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET) // Verify token validity and decode token (returns the Object which the token was based on)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token missing or invalid'})
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog ({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  const savedPost = await blog.save()
  user.blogs = user.blogs.concat(savedPost._id)
  await user.save()

  res.status(201).json(savedPost)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  updatedBlog ? 
    res.status(200).json(updatedBlog.toJSON())
    : res.status(404).end()
})

module.exports = blogsRouter