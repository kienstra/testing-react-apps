// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act, waitForElementToBeRemoved} from '@testing-library/react'
import Location from '../../examples/location'

const mockCurrentPosition = jest.fn()
window.navigator.geolocation = {
  getCurrentPosition: mockCurrentPosition,
}

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the current location of the user', async () => {
  const fakePosition = {
    coords: {
      latitude: 100,
      longitude: 150,
    },
  }

  const {promise, resolve, reject} = deferred()

  mockCurrentPosition.mockImplementation((success, error) => {
    promise.then(() => success(fakePosition))
  })

  render( <Location /> )
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  resolve()
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByText(fakePosition.coords.latitude, {exact: false})).toBeInTheDocument()
  expect(screen.getByText(fakePosition.coords.longitude, {exact: false})).toBeInTheDocument()
})

/*
eslint
  no-unused-vars: "off",
*/
