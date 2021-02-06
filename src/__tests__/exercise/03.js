// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
// 🐨 add `screen` to the import here:
import {fireEvent, render, screen} from '@testing-library/react'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const {container} = render(<Counter />)
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const increment = screen.getByRole('button', {name: /increment/i})

  expect(container).toHaveTextContent('Current count: 0')
  fireEvent.click(increment)
  expect(container).toHaveTextContent('Current count: 1')
  fireEvent.click(decrement)
  expect(container).toHaveTextContent('Current count: 0')
})
