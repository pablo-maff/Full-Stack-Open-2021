import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Mr Tester',
    likes: 23,
    url: 'https://example.com'
  }

  const { container } = render(<Blog blog={blog}/>)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div).toHaveTextContent('Mr Tester')
  expect(div).not.toHaveTextContent('23')
  expect(div).not.toHaveTextContent('https://example.com')
})