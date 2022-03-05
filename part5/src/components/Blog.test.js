import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let div

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Mr Tester',
      likes: 23,
      url: 'https://example.com',
      user: {
        name: 'Pablo Maffioli'
      }
    }
    const user = {
      name: 'Pablo Maffioli'
    }

    const mockHandler = jest.fn()
    container = render(<Blog blog={blog} user={user} onClick={mockHandler} />).container
    div = container.querySelector('.blog')
  })

  test('renders only title and author', () => {
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).toHaveTextContent('Mr Tester')
    expect(div).not.toHaveTextContent('23')
    expect(div).not.toHaveTextContent('https://example.com')
  })

  test('url and likes are shown when pressing the view button', () => {
    const button = screen.getByText('View')
    userEvent.click(button)

    expect(div).toHaveTextContent('23')
    expect(div).toHaveTextContent('https://example.com')
  })
})