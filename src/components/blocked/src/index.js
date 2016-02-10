import {Component, PropTypes} from 'react'
import {Icon} from 'react-mdl'
import {t} from 'utils/i18n'

import _styles from './index.scss'

export default class Blocked extends Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    hostname: PropTypes.string.isRequired
  }

  render () {
    const {href, hostname} = this.props

    return (
      <div className='app-blocked'>
        <p className='app-blocked__info'>
          <Icon name='lock' />
          {t('msg_blocked_page_label')}
        </p>
        <p className='app-blocked__href'>
          {href}
        </p>
        <p className='app-blocked__instructions'>
          {t('msg_blocked_instructions_label', hostname)}
        </p>
      </div>
    )
  }
}
