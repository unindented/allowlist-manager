import {getItems, setItems, onChangeItems} from 'utils/platform'

const defaults = {
  blockPages: false,
  blockOthers: false,
  whitelist: ['bing.*', 'google.*', 'paypal.me', 'wikimedia.org', 'wikipedia.org']
}

export function defaultSettings () {
  return defaults
}

export function loadOldSettings (callback) {
  try {
    const blockPages = localStorage.getItem('filter_enabled')
    const whitelist = localStorage.getItem('filter_entries')
    localStorage.clear()

    if (blockPages != null || whitelist != null) {
      callback({
        blockPages: !!JSON.parse(blockPages),
        blockOthers: false,
        whitelist: JSON.parse(whitelist)
      })
    } else {
      callback()
    }
  } catch (e) {
    callback()
  }
}

export function loadSettings (callback) {
  getItems(defaultSettings(), callback)
}

export function saveSettings (settings, callback) {
  setItems(settings, callback)
}

export function onChangeSettings (callback) {
  onChangeItems(callback)
}
