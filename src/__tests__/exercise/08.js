// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {act, render} from '@testing-library/react'
import useCounter from '../../components/use-counter'

function setup(options = {}) {
  const results = {}
  function TestComponent() {
    Object.assign(results, useCounter(options))
    return null
  }
  render(<TestComponent />)

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

test('allows customization of the initial count', () => {
  const options = {
    initialCount: 5,
  }

  const results = setup(options)

  expect(results.count).toEqual(options.initialCount)

  act(() => results.increment())
  expect(results.count).toEqual(options.initialCount + 1)

  act(() => results.decrement())
  expect(results.count).toEqual(options.initialCount)
})

test('allows customization of the step', () => {
  const options = {
    step: 10,
  }

  const results = setup(options)

  expect(results.count).toEqual(0)

  act(() => results.increment())
  expect(results.count).toEqual(options.step)

  act(() => results.decrement())
  expect(results.count).toEqual(0)
})

/* eslint no-unused-vars:0 */
