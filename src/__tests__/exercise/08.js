// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {act, render} from '@testing-library/react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  let result
  function TestComponent(props) {
    result = useCounter(props)
    return null
  }
  render(<TestComponent />)

  expect(result).toEqual({
    count: 0,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })

  act(() => result.increment())
  expect(result.count).toEqual(1)

  act(() => result.decrement())
  expect(result.count).toEqual(0)
})

test('applies options passed for initial state', () => {
  const options = {
    initialCount: 5,
    step: 10,
  }

  let result
  function TestComponent(props) {
    result = useCounter(props)
    return null
  }
  render(<TestComponent {...options} />)

  expect(result).toEqual({
    count: options.initialCount,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })

  act(() => result.increment())
  expect(result.count).toEqual(options.initialCount + options.step)

  act(() => result.decrement())
  expect(result.count).toEqual(options.initialCount)
})

/* eslint no-unused-vars:0 */
