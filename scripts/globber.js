(function() {
  var Globber, StringBuffer, root;
  root = (typeof exports !== "undefined" && exports !== null) ? exports : this;
  Globber = function(pattern, options) {
    var _ref, buffer, caseInsensitive, ch, inCharSet, questionCanMatchZero, starCannotMatchZero;
    if (!(options != null)) {
      options = Globber.DEFAULT_MASK;
    }
    caseInsensitive = (options & Globber.CASE_INSENSITIVE_MASK) !== 0;
    starCannotMatchZero = (options & Globber.STAR_CANNOT_MATCH_ZERO_MASK) !== 0;
    questionCanMatchZero = (options & Globber.QUESTION_CAN_MATCH_ZERO_MASK) !== 0;
    buffer = new StringBuffer();
    inCharSet = false;
    _ref = pattern.length;
    for (ch = 0; (0 <= _ref ? ch < _ref : ch > _ref); (0 <= _ref ? ch += 1 : ch -= 1)) {
      switch (pattern[ch]) {
        case '*':
          if (inCharSet) {
            buffer.append('*');
          } else {
            buffer.append(starCannotMatchZero ? '.+' : '.*');
          }
          break;
        case '?':
          if (inCharSet) {
            buffer.append('?');
          } else {
            buffer.append(questionCanMatchZero ? '.?' : '.');
          }
          break;
        case '[':
          inCharSet = true;
          buffer.append(pattern[ch]);
          if (ch + 1 < pattern.length) {
            switch (pattern[ch + 1]) {
              case '!':
              case '^':
                buffer.append('^');
                ch++;
                break;
              case ']':
                buffer.append(']');
                ch++;
                break;
            }
          }
          break;
        case ']':
          inCharSet = false;
          buffer.append(pattern[ch]);
          break;
        case '\\':
          buffer.append('\\');
          if (ch === pattern.length - 1) {
            buffer.append('\\');
          } else if (this.__isGlobMetaCharacter(pattern[ch + 1])) {
            buffer.append(pattern[++ch]);
          } else {
            buffer.append('\\');
          }
          break;
        default:
          if (!inCharSet && this.__isRegExpMetaCharacter(pattern[ch])) {
            buffer.append('\\');
          }
          buffer.append(pattern[ch]);
      }
    }
    this.regexp = buffer.toString();
    if (pattern.match(/^[^.*]+\.[^.]+$/)) {
      this.regexp = ("(.+\\.)?" + (this.regexp));
    }
    this.regexp = ("^" + (this.regexp) + "$");
    this.mods = '';
    if (caseInsensitive) {
      this.mods += Globber.CASE_INSENSITIVE_MOD;
    }
    return this;
  };
  Globber.prototype.__isGlobMetaCharacter = function(ch) {
    return "*?[]".indexOf(ch) >= 0;
  };
  Globber.prototype.__isRegExpMetaCharacter = function(ch) {
    return "'*?+[]()|^$.{}/\\".indexOf(ch) >= 0;
  };
  Globber.prototype.compile = function() {
    return new RegExp(this.regexp, this.mods);
  };
  Globber.prototype.toString = function() {
    return ("/" + (this.regexp) + "/" + (this.mods));
  };
  Globber.CASE_INSENSITIVE_MASK = 0x0001;
  Globber.STAR_CANNOT_MATCH_ZERO_MASK = 0x0002;
  Globber.QUESTION_CAN_MATCH_ZERO_MASK = 0x0003;
  Globber.DEFAULT_MASK = Globber.CASE_INSENSITIVE_MASK;
  Globber.CASE_INSENSITIVE_MOD = 'i';
  StringBuffer = function() {
    this.buffer = [];
    return this;
  };
  StringBuffer.prototype.append = function(string) {
    this.buffer.push(string);
    return this.buffer;
  };
  StringBuffer.prototype.toString = function() {
    return this.buffer.join('');
  };
  root.Globber = Globber;
}).call(this);
