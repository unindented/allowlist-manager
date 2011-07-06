################################################################################
#
# Configuration utils.
#
################################################################################

root = exports ? this

################################################################################

DEFAULT_OPTIONS =
  'filter_enabled': false
  'filter_entries': [
    'bing.*'
    'google.*'
    'yahoo.*'
  ]

################################################################################

Config =

  checkFilter: (hostname, pathname) ->
    return false if not hostname?
    return true if not Config.isFilterEnabled()

    for entry in Config.getFilterEntries()
      regexp = new Globber(entry).compile()
      return true if hostname.match(regexp)

    return false


  isFilterEnabled: ->
    return Config.getOption('filter_enabled') is 'true'

  setFilterEnabled: (enabled) ->
    return Config.setOption('filter_enabled', if enabled then 'true' else 'false')


  getFilterEntries: ->
    return Config.getOption('filter_entries', true)

  setFilterEntries: (entries) ->
    return Config.setOption('filter_entries', entries, true)


  getOption: (key, json) ->
    return null if not key?
    value = localStorage.getItem(key)
    value = JSON.parse(value) if json
    return value or DEFAULT_OPTIONS[key]

  setOption: (key, value, json) ->
    return if not key? or not value?
    value = JSON.stringify(value) if json
    return localStorage.setItem(key, value)

  clearOptions: ->
    return localStorage.clear()

################################################################################

# export Config
root.Config = Config

