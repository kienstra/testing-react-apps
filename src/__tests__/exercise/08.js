// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
function Counter() {
  const {count, increment, decrement} = useCounter()

  return (
    <div>
      <button
        onClick={ () => increment() }
      >
        Increment
      </button>
      <button
        onClick={ () => decrement() }
      >
        Decrement
      </button>
      <span>{ `The count is ${ count }` }</span>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<Counter />)
  expect(screen.getByText(/count/i)).toHaveTextContent('The count is 0')

  userEvent.click(screen.getByRole('button', {name: /increment/i}))
  expect(screen.getByText(/count/i)).toHaveTextContent('The count is 1')

  userEvent.click(screen.getByRole('button', {name: /decrement/i}))
  expect(screen.getByText(/count/i)).toHaveTextContent('The count is 0')
})

/* eslint no-unused-vars:0 */
