const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { describe } = require('eslint/lib/rule-tester/rule-tester')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

xtest('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

xtest('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

xtest('identifier is named "id"', async () => {
  const request = await api.post('/api/blogs').send(helper.nonExistingId())
    .expect(201)

  expect(request.body.id).toBeDefined()
})

describe('Adding a new blog post', () => {
  test('is succesfully created', async () => {
    await api.post('/api/blogs').send(helper.postNewBlog)
      .expect(201)
    
    expect(await helper.blogsInDb()).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('saves its content', async () => {
    await api.post('/api/blogs').send(helper.postNewBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    delete blogs.at(-1).id
    expect(blogs).toContainEqual(helper.postNewBlog)
  })

  test.only('if likes property is missing, default value is 0', async () => {
    let toPost = helper.postNewBlog
    delete toPost.likes
    await api.post('/api/blogs').send(toPost)
      .expect(201)
    
    const blogs = await helper.blogsInDb()
    expect(blogs.at(-1)).toHaveProperty('likes', 0)
  })
})
afterAll(() => {
  mongoose.connection.close()
})