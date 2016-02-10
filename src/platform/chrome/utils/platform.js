require('../manifest.json')
require.context('_locales', true, /.*\.json/)
require.context('assets', false, /icon_.*\.png/)

export function getExtensionManifest () {
  return window.chrome.runtime.getManifest()
}

export function getExtensionUrl () {
  return window.chrome.extension.getURL.apply(window.chrome.extension, arguments)
}

export function getI18nMessage () {
  return window.chrome.i18n.getMessage.apply(window.chrome.i18n, arguments)
}

function getStorage () {
  return window.chrome.storage.sync || window.chrome.storage.local
}

export function getItems (defaults, callback) {
  const storage = getStorage()
  storage.get(defaults, callback)
}

export function setItems (items, callback) {
  const storage = getStorage()
  storage.set(items, callback)
}

export function onChangeItems (callback) {
  window.chrome.storage.onChanged.addListener(callback)
}

export function onBeforeRequest (callback) {
  const urls = ['<all_urls>']
  window.chrome.webRequest.onBeforeRequest.addListener(callback, {urls}, ['blocking'])
}

export function updateTab (id, url) {
  url = getExtensionUrl(url)

  window.chrome.tabs.update(id, {url})
}
