import {Component, PropTypes} from 'react'
import {Router, Route} from 'react-router'
import Layout from 'components/layout'
import Blocked from 'components/blocked'
import Options from 'components/options'

import _styles from './index.scss'

export default class App extends Component {
  static propTypes = {
    history: PropTypes.any.isRequired
  }

  render () {
    const {history} = this.props

    return (
      <Router history={history}>
        <Route path='/' component={Layout}>
          <Route path='blocked.html' component={Blocked} />
          <Route path='optionsalt.html' component={Options} />
        </Route>
      </Router>
    )
  }
}
