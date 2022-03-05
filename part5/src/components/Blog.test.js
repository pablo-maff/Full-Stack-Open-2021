import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let div
  let likeHandler

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

    const viewHandler = jest.fn()
    likeHandler = jest.fn()

    container = render(<Blog blog={blog} user={user} onClick={viewHandler} updateBlog={likeHandler} />).container
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

  test.only(
    'if the like button is called twice, the event handler the component received as props is called twice'
    , () => {
      const clickView = screen.getByText('View')
      userEvent.click(clickView)
      const giveLike = screen.getByText('Like')
      userEvent.click(giveLike)
      userEvent.click(giveLike)

      expect(likeHandler.mock.calls).toHaveLength(2)
      expect(div).toHaveTextContent('25')

    })
})