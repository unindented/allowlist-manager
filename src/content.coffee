################################################################################
#
# Content script.
#
################################################################################

root = exports ? this

################################################################################

init = ->
  chrome.extension.sendRequest(
    {
      'operation': 'checkFilter'
      'hostname':  window.location.hostname
      'pathname':  window.location.pathname
    },
    ((response) ->
      # if the url is not blocked, let it load
      return if response.result is yes

      # but if it is blocked, stop loading and redirect to our warning page
      window.stop()

      href     = encodeURIComponent(window.location.href)
      hostname = encodeURIComponent(window.location.hostname)
      pathname = encodeURIComponent(window.location.pathname)

      newUrl = "warning.html?href=#{href}&hostname=#{hostname}&pathname=#{pathname}"
      window.location.replace(chrome.extension.getURL(newUrl))
    )
  )

################################################################################

init()

