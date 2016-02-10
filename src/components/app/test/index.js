import {createMemoryHistory} from 'react-router'
import App from 'components/app'
import {render} from 'utils/test'

describe('App', function () {
  beforeEach(function () {
    const history = createMemoryHistory('/blocked.html?details=eyJocmVmIjoiaHR0cHM6Ly91bmluZGVudGVkLm9yZy8iLCJob3N0bmFtZSI6InVuaW5kZW50ZWQub3JnIn0=')
    this.element = render(<App history={history} />)
  })

  it('renders', function () {
    expect(this.element).toHaveTag('div')
  })
})
