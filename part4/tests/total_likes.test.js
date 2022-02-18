const { describe } = require('eslint/lib/rule-tester/rule-tester')
const listHelper = require('../utils/list_helper')


const blogs = [
  {
    'title': 'Amazing blog post',
    'author': 'Amazing author',
    'url': 'https://amazingblog.com/blog/amazing-post',
    'likes': 23,
    'id': '620cc3bb1c0652aa1490fee7'
  },
  {
    'title': 'Double Amazing blog post',
    'author': 'Double Amazing author',
    'url': 'https://amazingblog.com/blog/double-amazing-post',
    'likes': 46,
    'id': '620ccd89cce377c84da3c807'
  },
  {
    'title': 'triple Amazing blog post',
    'author': 'triple Amazing author',
    'url': 'https://amazingblog.com/blog/triple-amazing-post',
    'likes': 69,
    'id': '620cd5dbb0843c2228536d6d'
  },
  {
    'title': 'cuadruple Amazing blog post',
    'author': 'cuadruple Amazing author',
    'url': 'https://amazingblog.com/blog/cuadruple-amazing-post',
    'likes': 92,
    'id': '620cd7bc15a3310f6e24e1ee'
  }
]

describe('Total Likes', () => {
  const noBlogs = []
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(noBlogs)
    expect(result).toBe(0)
  })

  const listWithOneBlog = [blogs[0].likes]
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(23)
  })

  test('of a bigger list is calculated right', () => {
    const listWithManyBlogs = blogs.map(e => e.likes)
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(230)
  })
})

describe('Favourite Blog', () => {
  test('is the one with most likes', () => {
    const result = listHelper.favouriteBlog(blogs)
    expect(result).toEqual(blogs[3])
  })
})