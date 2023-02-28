/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { mockComponent } from 'react-dom/test-utils'
const blog = {
    title: 'test',
    url :'dabibbels',
    author:'Simo',
    likes:0,
    user: {
      username: 'test user',
      name: 'test name',
    },
  }
  let component;
  const likeMockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} blogUpdate={likeMockHandler} />
    );
  });


test('renders content', () => {

    const { container } = render(<Blog blog={blog}/>)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'test'
  )
  })

  test('doenst show url and likes by default', () => {
    expect(component.container).toHaveTextContent(
      blog.title
    )
    expect(component.container).toHaveTextContent(
      blog.author
    )
    
    const hiddenContent = component.container.querySelector(
      '.togglableContent'
    )
    expect(hiddenContent).toHaveStyle('display: none')
    expect(hiddenContent).not.toBeVisible()
  })

  test('Renders url and likes when more info is pressed', async () => {
    const button = component.container.querySelector('button')
    const user = userEvent.setup()
    await user.click(button)

    const hiddenContent = component.container.querySelector(
      '.togglableContent'
    )
    expect(hiddenContent).toBeVisible()
    expect(hiddenContent).toHaveTextContent(blog.likes)
    expect(hiddenContent).toHaveTextContent(blog.url)
  })

  test('2 likes equals 2 calls',async () =>{
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(likeMockHandler.mock.calls).toHaveLength(2)
  
  }
  )
  

