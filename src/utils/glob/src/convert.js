function isGlobMetaCharacter (ch) {
  return '*?[]'.indexOf(ch) >= 0
}

function isRegExpMetaCharacter (ch) {
  return '\\^$.*+?()[]{}|'.indexOf(ch) >= 0
}

export default function convert (pattern, options = {}) {
  const {starCannotMatchZero, questionCanMatchZero} = options

  let buffer = ''
  let inCharSet = false

  for (let i = 0, l = pattern.length; i < l; ++i) {
    switch (pattern[i]) {
      case '*':
        if (inCharSet) {
          buffer += '*'
        } else {
          buffer += starCannotMatchZero ? '.+' : '.*'
        }
        break
      case '?':
        if (inCharSet) {
          buffer += '?'
        } else {
          buffer += questionCanMatchZero ? '.?' : '.'
        }
        break
      case '[':
        inCharSet = true
        buffer += pattern[i]
        if (i + 1 < l) {
          switch (pattern[i + 1]) {
            case '!':
            case '^':
              buffer += '^'
              ++i
              continue
            case ']':
              buffer += ']'
              ++i
              continue
          }
        }
        break
      case ']':
        inCharSet = false
        buffer += pattern[i]
        break
      case '\\':
        buffer += '\\'
        if (i === l - 1) {
          buffer += '\\'
        } else if (isGlobMetaCharacter(pattern[i + 1])) {
          buffer += pattern[++i]
        } else {
          buffer += '\\'
        }
        break
      default:
        if (!inCharSet && isRegExpMetaCharacter(pattern[i])) {
          buffer += '\\'
        }
        buffer += pattern[i]
    }
  }

  return buffer
}
