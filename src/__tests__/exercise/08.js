// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {act, render} from '@testing-library/react'
import useCounter from '../../components/use-counter'

function setup(options) {
  const results = {}
  function TestComponent(props) {
    Object.assign(results, useCounter(props))
    return null
  }
  render(<TestComponent {...options} />)

  return results
}

test('exposes the count and increment/decrement functions', () => {
  const results = setup()

  expect(results).toEqual({
    count: 0,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })

  act(() => results.increment())
  expect(results.count).toEqual(1)

  act(() => results.decrement())
  expect(results.count).toEqual(0)
})

test('applies options passed for initial state', () => {
  const options = {
    initialCount: 5,
    step: 10,
  }

  const results = setup(options)

  expect(results).toEqual({
    count: options.initialCount,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })

  act(() => results.increment())
  expect(results.count).toEqual(options.initialCount + options.step)

  act(() => results.decrement())
  expect(results.count).toEqual(options.initialCount)
})

/* eslint no-unused-vars:0 */
