// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const container = document.createElement('div')
  document.body.append(container)
  ReactDOM.render(
    <Counter />,
    container
  )

  const buttons = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')
  expect(message.textContent).toBe('Current count: 0')

  buttons[1].click()
  expect(message.textContent).toBe('Current count: 1')

  buttons[0].click()
  expect(message.textContent).toBe('Current count: 0')
  container.remove()
})

/* eslint no-unused-vars:0 */
