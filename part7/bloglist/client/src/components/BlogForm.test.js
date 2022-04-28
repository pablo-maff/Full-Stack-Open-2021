import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<Blogform />', () => {
  test('calls the event handler received as props with the right details when a new blog is created', () => {
    const createBlog = jest.fn()

    render(<BlogForm newBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('blog title')
    const authorInput = screen.getByPlaceholderText('blog author')
    const urlInput = screen.getByPlaceholderText('blog url')

    const sendButton = screen.getByText('Create')

    userEvent.type(titleInput, 'testing a form...')
    userEvent.type(authorInput, 'Mr. Author')
    userEvent.type(urlInput, 'https://example.com')

    userEvent.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
    expect(createBlog.mock.calls[0][0].author).toBe('Mr. Author')
    expect(createBlog.mock.calls[0][0].url).toBe('https://example.com')
  })
})
