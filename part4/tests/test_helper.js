const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First Dummy',
    author: 'Dummy author',
    url: 'https://dummy.com',
    likes: 5
  },
  {
    title: 'Second Dummy',
    author: 'Second dummy author',
    url: 'https://dummy2.com',
    likes: 10
  }
]

const postNewBlog = {  
  title: 'New blog post',
  author: 'New author',
  url: 'https://new-post.com',
  likes: 2
}

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon'})
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, nonExistingId, postNewBlog
}