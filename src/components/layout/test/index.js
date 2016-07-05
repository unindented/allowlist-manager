import React from 'react'
import Layout from 'components/layout'
import {render} from 'utils/test'

describe('Layout', function () {
  beforeEach(function () {
    const location = {query: {details: 'eyJocmVmIjoiaHR0cHM6Ly91bmluZGVudGVkLm9yZy8iLCJob3N0bmFtZSI6InVuaW5kZW50ZWQub3JnIn0='}}
    this.element = render(<Layout location={location} />)
  })

  it('renders with the correct class name', function () {
    expect(this.element).toHaveClass('app-layout')
  })
})
