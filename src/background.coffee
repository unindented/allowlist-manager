################################################################################
#
# Background script.
#
################################################################################

root = exports ? this

################################################################################

init = (event) ->
  chrome.extension.onRequest.addListener(
    ((request, sender, callback) ->
      switch request.operation
        when 'checkFilter'
          callback({ 'result': Config.checkFilter(request.hostname, request.pathname) })
    )
  )

################################################################################

window.addEventListener('load', init, true)

