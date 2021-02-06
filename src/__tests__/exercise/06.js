// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {} from '@testing-library/react-hooks'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

jest.mock('react-use-geolocation')

test('displays the current location of the user', async () => {
  let setReturnValue
  function useMockCurrentPosition() {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  const mockPosition = {
    coords: {
      latitude: 32,
      longitude: 129,
    },
  }

  act(() => {
    setReturnValue([mockPosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${mockPosition.coords.latitude}`
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${mockPosition.coords.longitude}`
  )
})

/*
eslint
  no-unused-vars: "off",
*/
