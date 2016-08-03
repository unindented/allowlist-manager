import React, {Component} from 'react'
import {autobind} from 'core-decorators'
import {t} from 'utils/i18n'
import {defaultSettings, loadSettings, saveSettings} from 'utils/settings'
import {isTrackingPermitted, setTrackingPermitted} from 'utils/analytics'

import _styles from './index.scss'

export default class Options extends Component {
  constructor () {
    super()

    this.state = Object.assign({trackingPermitted: false}, defaultSettings())

    loadSettings(function (settings) {
      this.setState(settings)
    }.bind(this))

    isTrackingPermitted(function (permitted) {
      this.setState({trackingPermitted: permitted})
    }.bind(this))
  }

  @autobind
  handleChangeBlockPages (evt) {
    const {checked: blockPages} = evt.target
    saveSettings({blockPages})
    this.setState({blockPages})
  }

  @autobind
  handleChangeBlockOthers (evt) {
    const {checked: blockOthers} = evt.target
    saveSettings({blockOthers})
    this.setState({blockOthers})
  }

  @autobind
  handleChangeWhitelist (evt) {
    const {value} = evt.target
    const whitelist = value.split('\n')
    saveSettings({whitelist})
    this.setState({whitelist})
  }

  @autobind
  handleChangeAnalytics (evt) {
    const {checked: trackingPermitted} = evt.target
    setTrackingPermitted(trackingPermitted)
    this.setState({trackingPermitted})
  }

  render () {
    const {blockPages, blockOthers, whitelist, trackingPermitted} = this.state

    return (
      <div className="app-options">
        <p>
          <i>{t('msg_options_instructions_label')}</i>
        </p>
        <label className="app-options__option">
          <input type="checkbox" id="app-options-block-pages" className="app-options__checkbox"
            checked={blockPages}
            onChange={this.handleChangeBlockPages}
          />
          <span className="app-options__label">
            {t('msg_options_block_pages_label')}
          </span>
        </label>
        <label className="app-options__option">
          <input type="checkbox" id="app-options-block-others" className="app-options__checkbox"
            checked={blockOthers}
            onChange={this.handleChangeBlockOthers}
          />
          <span className="app-options__label">
            {t('msg_options_block_others_label')}
          </span>
        </label>
        <label className="app-options__option-hidden" htmlFor="app-options-whitelist">
          <span className="app-options__label">
            {t('msg_options_whitelist_label')}
          </span>
        </label>
        <textarea id="app-options-whitelist" className="app-options__textarea"
          value={whitelist.join('\n')}
          onChange={this.handleChangeWhitelist}
        />
        <label className="app-options__option">
          <input type="checkbox" id="app-options-analytics" className="app-options__checkbox"
            checked={trackingPermitted}
            onChange={this.handleChangeAnalytics}
          />
          <span className="app-options__label">
            {t('msg_options_analytics_label')}
          </span>
        </label>
      </div>
    )
  }
}
