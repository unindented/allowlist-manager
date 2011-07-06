################################################################################
#
# Options page.
#
################################################################################

STATE_LOCKED     = 'locked'
STATE_UNLOCKED   = 'unlocked'

################################################################################

wrapperElem            = null  # content wrapper

filterEnabledElem      = null  # website filtering checkbox
filterNewElem          = null  # new filter text field
filterAddElem          = null  # new filter button
filterInvalidErrorElem = null  # new filter error message
filterEntriesElem      = null  # list of filters

resetButtonElem        = null  # reset button
saveButtonElem         = null  # save button


init = (event) ->
  # init query parameters
  initParams()

  # init controls
  initControls()

  # no dialog to show
  setState(STATE_UNLOCKED)


initParams = ->

initControls = ->
  # wrapper element
  wrapperElem = document.getElementById('wrapper')

  # filtering options elements
  filterEnabledElem      = document.getElementById('filter_enabled')
  filterNewElem          = document.getElementById('filter_new')
  filterAddElem          = document.getElementById('filter_add')
  filterInvalidErrorElem = document.getElementById('filter_invalid_error')
  filterEntriesElem      = document.getElementById('filter_entries')
  # set values
  filterEnabledElem.checked = Config.isFilterEnabled()

  # populate filter entries
  Utils.clearElement(filterEntriesElem)
  for entry in Config.getFilterEntries()
    addFilterEntry(entry)

  # add checkbox listener to disable associated controls
  filterEnabledElem.addEventListener('change', onFilterEnabledChanged, true)
  # and fire the event a first time
  Utils.fireEvent(filterEnabledElem, 'change')

  # add button listener to add new entries
  filterAddElem.addEventListener('click', onFilterAddClicked, true)

  # button elements
  resetButtonElem = document.getElementById('options_reset')
  saveButtonElem  = document.getElementById('options_save')

  # add button listener to reset the form
  resetButtonElem.addEventListener('click', onResetButtonClicked, true)

  # add button listener to save the form
  saveButtonElem.addEventListener('click', onSaveButtonClicked, true)


setState = (state) ->
  wrapperElem.className = state

################################################################################

onFilterEnabledChanged = (event) ->
  enableFilterOptions(event.target.checked)

onFilterRemoveClicked = (event) ->
  removeFilterEntry(event.target.parentNode)

onFilterAddClicked = (event) ->
  addFilterEntry(filterNewElem.value)

onResetButtonClicked = (event) ->
  resetOptions()

onSaveButtonClicked = (event) ->
  saveOptions()

################################################################################

enableFilterOptions = (enable) ->
  # disable the elements
  filterNewElem.disabled = not enable
  filterAddElem.disabled = not enable
  # and clear their contents
  filterNewElem.value = '' if not enable


displayFilterInvalidError = (display) ->
  Utils.displayElement(filterInvalidErrorElem, display)


removeFilterEntry = (elem) ->
  filterEntriesElem.removeChild(elem)


addFilterEntry = (entry) ->
  entry = entry or ''
  entry = entry.trim()

  # show error if the filter is empty
  if not entry
    displayFilterInvalidError(true)
    return

  # show error if the filter couldn't be compiled
  try
    new Globber(entry).compile()
  catch error
    displayFilterInvalidError(true)
    return

  # if everything went well, hide the error
  displayFilterInvalidError(false)

  # create the entry
  entryElem = createFilterEntry(entry)

  # add the new filter to the list
  filterEntriesElem.appendChild(entryElem)
  # and clear the text field
  filterNewElem.value = null

  return entryElem

createFilterEntry = (entry) ->
  handleElem = Utils.createElement({
    'tagName':     'span'
    'className':   'handle'
    'textContent': entry
  })
  removeElem = Utils.createElement({
    'tagName':     'span'
    'className':   'remove'
    'textContent': '×'
  })
  removeElem.addEventListener('click', onFilterRemoveClicked, true)

  entryElem = Utils.createElement({
    'tagName':    'li'
    'className':  'filter_entry'
  })
  entryElem.appendChild(handleElem)
  entryElem.appendChild(removeElem)

  return entryElem


resetOptions = ->
  Utils.reload()

saveOptions = ->
  filterEnabled   = filterEnabledElem.checked
  filterEntries   = []

  # get the listed filter entries
  for entry in filterEntriesElem.querySelectorAll('.handle')
    filterEntries.push(entry.textContent)

  # save filter enabled
  Config.setFilterEnabled(filterEnabled)
  # save filter entries
  Config.setFilterEntries(filterEntries)

################################################################################

window.addEventListener('load', init, true)

