// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  let submittedData
  const handleSubmit = data => (submittedData = data)
  render(<Login onSubmit={handleSubmit} />)

  const mockUsername = 'obasidsfs'
  const mockPassword = 'iguwbiwef'
  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)

  userEvent.type(username, mockUsername)
  userEvent.type(password, mockPassword)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(submittedData).toEqual({
    username: mockUsername,
    password: mockPassword,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
