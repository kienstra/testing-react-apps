// testing custom hooks
// http://localhost:3000/counter-hook

import {act, renderHook} from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(useCounter)

  expect(result.current).toEqual({
    count: 0,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })

  act(() => result.current.increment())
  expect(result.current.count).toBe(1)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const options = {
    initialCount: 5,
  }

  const {result} = renderHook(useCounter, {initialProps: options})

  expect(result.current.count).toBe(options.initialCount)

  act(() => result.current.increment())
  expect(result.current.count).toBe(options.initialCount + 1)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(options.initialCount)
})

test('allows customization of the step', () => {
  const options = {
    step: 10
  }
  const {result} = renderHook(useCounter, {initialProps: options})

  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(options.step)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('the step can be changed', () => {
  const options = {
    step: 10
  }
  const {rerender, result} = renderHook(useCounter, {initialProps: options})

  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(options.step)

  const newOptions = {
    step: 15,
  }
  rerender(newOptions)

  act(() => result.current.increment())
  expect(result.current.count).toBe(options.step + newOptions.step)
})

/* eslint no-unused-vars:0 */
