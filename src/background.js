import {parse} from 'url'
import {compile} from 'utils/glob'
import {onBeforeRequest, updateTab} from 'utils/platform'
import {loadSettings, loadOldSettings, saveSettings, onChangeSettings} from 'utils/settings'
import {trackException} from 'utils/analytics'

import _template from './background.html'

const settings = {}

const redirect = (details) => {
  const {tabId, type, url} = details
  const blockPages = settings.blockPages && type === 'main_frame'
  const blockOthers = settings.blockOthers && type !== 'main_frame'

  if (blockPages || blockOthers) {
    const parsed = parse(url)
    const match = settings.whitelist.find((entry) => entry(parsed))

    if (!match) {
      if (blockPages) {
        updateTab(tabId, `blocked.html?details=${btoa(JSON.stringify(parsed))}`)
      }
      if (blockPages || blockOthers) {
        return {cancel: true}
      }
    }
  }
}

const reload = () => {
  loadSettings(({blockPages, blockOthers, whitelist}) => {
    settings.blockPages = blockPages
    settings.blockOthers = blockOthers
    settings.whitelist = whitelist.map(compile)
  })
}

const init = () => {
  // Monitor every request.
  onBeforeRequest(redirect)

  // If settings change, reload.
  onChangeSettings(reload)

  // Load for the first time.
  loadOldSettings((oldSettings) => {
    if (oldSettings) {
      saveSettings(oldSettings)
    } else {
      reload()
    }
  })
}

const error = (e) => {
  trackException(e.error)
}

/* ************************************************************************** */

window.addEventListener('load', init, true)
window.addEventListener('error', error, true)
