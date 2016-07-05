import React, {Component, PropTypes, cloneElement} from 'react'
import {Header, Icon, Navigation, Content, Card, CardText} from 'react-mdl'
import {autobind} from 'core-decorators'
import AboutDialog from 'components/about-dialog'
import {t} from 'utils/i18n'
import {trackEvent} from 'utils/analytics'

import _styles from './index.scss'

export default class Layout extends Component {
  static propTypes = {
    location: PropTypes.any,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ])
  }

  state = {}

  @autobind
  handleAboutClick () {
    trackEvent('About', 'Open')

    this.setState({about: true})
  }

  @autobind
  handleAboutDonate (url) {
    trackEvent('About', 'Donate', url)

    this.setState({about: false})
  }

  @autobind
  handleAboutClose () {
    trackEvent('About', 'Close')

    this.setState({about: false})
  }

  render () {
    const {location, children} = this.props
    const {about} = this.state
    const {details} = location.query
    const childProps = details != null ? JSON.parse(atob(details)) : {}

    const showAbout = !!about

    const title = (
      <span>
        <Icon name='lock' />
        {t('ext_name')}
      </span>
    )

    return (
      <div className='app-layout'>
        <div className='app-layout__container'>
          <Header title={title}>
            <Navigation>
              <a href='#'
                onClick={this.handleAboutClick}
              >
                {t('msg_header_about')}
              </a>
            </Navigation>
          </Header>

          <Content>
            <Card shadow={2}>
              <CardText>
                {children && cloneElement(children, childProps)}
              </CardText>
            </Card>
          </Content>
        </div>

        <AboutDialog
          open={showAbout}
          onDonate={this.handleAboutDonate}
          onClose={this.handleAboutClose}
        />
      </div>
    )
  }
}
