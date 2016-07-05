import React from 'react'
import Blocked from 'components/blocked'
import {render} from 'utils/test'

describe('Blocked', function () {
  beforeEach(function () {
    this.element = render(<Blocked href='https://unindented.org/' hostname='unindented.org' />)
  })

  it('renders with the correct class name', function () {
    expect(this.element).toHaveClass('app-blocked')
  })
})
