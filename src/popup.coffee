$(() ->
  $('#popup a').click(() ->
    chrome.tabs.create({ 'url': 'options.html' })
    window.close()
  )
)
