################################################################################
#
# Warning page.
#
################################################################################

root = exports ? this

################################################################################

STATE_LOCKED     = 'locked'
STATE_UNLOCKED   = 'unlocked'

################################################################################

wrapperElem   = null  # content wrapper

urlElem       = null  # blocked url

hrefElem      = null  # href hidden input
hostnameElem  = null  # hostname hidden input
pathnameElem  = null  # pathname hidden input

hrefParam     = null  # href query parameter
hostnameParam = null  # hostname query parameter
pathnameParam = null  # pathname query parameter


init = (event) ->
  # init query parameters
  initParams()

  # init controls
  initControls()

  # show the dialog
  setState(STATE_LOCKED)


initParams = ->
  # query parameters
  hrefParam     = decodeURIComponent(Query.href or '')
  hostnameParam = decodeURIComponent(Query.hostname or '')
  pathnameParam = decodeURIComponent(Query.pathname or '')

initControls = ->
  # wrapper element
  wrapperElem = document.getElementById('wrapper')

  # url element
  urlElem = document.getElementById('url')
  # set values
  urlElem.href        = hrefParam
  urlElem.title       = hrefParam
  urlElem.textContent = hrefParam

  # dialog elements
  hrefElem     = document.getElementById('href')
  hostnameElem = document.getElementById('hostname')
  pathnameElem = document.getElementById('pathname')
  # set values
  hrefElem.value     = hrefParam
  hostnameElem.value = hostnameParam
  pathnameElem.value = pathnameParam


setState = (state) ->
  wrapperElem.className = state

################################################################################

window.addEventListener('load', init, true)

