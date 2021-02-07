// testing custom hooks
// http://localhost:3000/counter-hook

import {act, renderHook} from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(() => useCounter())

  expect(result.current).toEqual({
    count: 0,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })

  act(() => result.current.increment())
  expect(result.current.count).toEqual(1)

  act(() => result.current.decrement())
  expect(result.current.count).toEqual(0)
})

test('allows customization of the initial count', () => {
  const options = {
    initialCount: 5,
  }

  const {result} = renderHook(() => useCounter(options))

  expect(result.current.count).toEqual(options.initialCount)

  act(() => result.current.increment())
  expect(result.current.count).toEqual(options.initialCount + 1)

  act(() => result.current.decrement())
  expect(result.current.count).toEqual(options.initialCount)
})

test('allows customization of the step', () => {
  const options = {
    step: 10,
  }

  const {result} = renderHook(() => useCounter(options))

  expect(result.current.count).toEqual(0)

  act(() => result.current.increment())
  expect(result.current.count).toEqual(options.step)

  act(() => result.current.decrement())
  expect(result.current.count).toEqual(0)
})

/* eslint no-unused-vars:0 */
