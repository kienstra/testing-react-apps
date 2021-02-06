// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  const mockHandleSubmit = jest.fn()
  render(<Login onSubmit={mockHandleSubmit} />)

  const username = 'obasidsfs'
  const password = 'iguwbiwef'

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(mockHandleSubmit).toHaveBeenCalledWith({username, password})
})

/*
eslint
  no-unused-vars: "off",
*/
