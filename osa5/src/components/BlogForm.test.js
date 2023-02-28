/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlogMock = jest.fn()
  const component = render(<BlogForm createBlog={createBlogMock} />)


  const titleInput = component.container.querySelector('.titleContent')
  const authorInput = component.container.querySelector('.authorContent')
  const urlInput = component.container.querySelector('.urlContent')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'Test')
  await user.type(authorInput, 'TestAuthor')
  await user.type(urlInput, 'ASD')
  await user.click(sendButton)

  expect(createBlogMock.mock.calls).toHaveLength(1)
  expect(createBlogMock.mock.calls[0][0].title).toBe('Test')
  expect(createBlogMock.mock.calls[0][0].author).toBe('TestAuthor')
  expect(createBlogMock.mock.calls[0][0].url).toBe('ASD')
})