$(() ->
  $('.sortable').sortable({
    'containment': 'body',
    'cursor':      'move',
    'handle':      '.handle',
    'opacity':     '0.75',
    'placeholder': 'highlight',
    'revert':      true
  })
  $('.sortable').disableSelection()
)

