const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { describe } = require('eslint/lib/rule-tester/rule-tester')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
/*
  INSERT BLOGS MANUALLY
  const blogObject = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
*/
})
describe('When there are blogs already saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('identifier is named "id"', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
    
    expect(response.body[0].id).toBeDefined()
  })
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

  test('if likes property is missing, default value is 0', async () => {
    let toPost = helper.postNewBlog
    delete toPost.likes

    await api.post('/api/blogs').send(toPost)
      .expect(201)
    
    const blogs = await helper.blogsInDb()
    expect(blogs.at(-1)).toHaveProperty('likes', 0)
  })

  test('if title and url properties are missing, return 400 Bad Request', async () => {
    let toPost = helper.postNewBlog
    delete toPost.title
    delete toPost.url

    await api.post('/api/blogs').send(toPost)
      .expect(400)
  })
})

describe('Deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  })

  test('fails with statuscode 400 if id is invalid', async() => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  test('blog is effectively deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })
})

describe('Viewing a specific blog', () => {
  test('succeeds if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toContainEqual(resultBlog.body)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()
    console.log(validNonExistingId)

    await api
      .get(`/api/blogs/${validNonExistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})
afterAll(() => {
  mongoose.connection.close()
})