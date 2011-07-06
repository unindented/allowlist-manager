################################################################################
#
# Class for compiling a glob expression into a RegExp object.
#
# Based on the Jakarta ORO implementation (http://jakarta.apache.org/oro/).
#
# Copyright (c) 2000-2005 The Apache Software Foundation
# Copyright (c) 2010 Daniel Perez Alvarez
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may not
# use this file except in compliance with the License. You may obtain a copy of
# the License at:
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations under
# the License.
#
################################################################################

root = exports ? this


################################################################################
#
# The Globber class will compile a glob expression into a RegExp object
# that may be used to match patterns.
#
# Because there are various similar glob expression syntaxes, Globber tries to
# provide a small amount of customization by providing the
# STAR_CANNOT_MATCH_ZERO_MASK and QUESTION_CAN_MATCH_ZERO_MASK compilation
# options.
#
# The Globber expression syntax is based on Unix shell glob expressions but
# should be usable to simulate Win32 wildcards. The following syntax is
# supported:
#
# *     - Matches zero or more instances of any character. If the
#         STAR_CANNOT_MATCH_ZERO_MASK option is used, _*_ matches one or more
#         instances of any character.
# ?     - Matches one instance of any character. If the
#         QUESTION_MATCHES_ZERO_OR_ONE_MASK option is used, _?_ matches zero or
#         one instances of any character.
# [...] - Matches any of characters enclosed by the brackets. Characters _*_ and
#         _?_ lose their special meanings within a character class. Additionaly
#         if the first character following the opening bracket is a _!_ or a
#         _^_, then any character not in the character class is matched. A _-_
#         between two characters can be used to denote a range. A _-_ at the
#         beginning or end of the character class matches itself rather than
#         referring to a range. A _]_ immediately following the opening _[_
#         matches itself rather than indicating the end of the character class,
#         otherwise it must be escaped with a backslash to refer to itself.
# \     - A backslash matches itself in most situations. But when a special
#         character such as a _*_ follows it, a backslash _escapes_ the
#         character, indicating that the special character should be interpreted
#         as a normal character instead of its special meaning.
#
# All other characters match themselves.
#
################################################################################

class Globber

  __isGlobMetaCharacter: (ch) ->
    return "*?[]".indexOf(ch) >= 0

  __isRegExpMetaCharacter: (ch) ->
    return "'*?+[]()|^$.{}/\\".indexOf(ch) >= 0

  constructor: (pattern, options) ->
    options = Globber.DEFAULT_MASK if not options?

    caseInsensitive      = (options & Globber.CASE_INSENSITIVE_MASK) != 0
    starCannotMatchZero  = (options & Globber.STAR_CANNOT_MATCH_ZERO_MASK) != 0
    questionCanMatchZero = (options & Globber.QUESTION_CAN_MATCH_ZERO_MASK) != 0

    buffer = new StringBuffer()
    inCharSet = false

    for ch in [0 ... pattern.length]
      switch pattern[ch]
        when '*'
          if inCharSet
            buffer.append('*')
          else
            buffer.append(if starCannotMatchZero then '.+' else '.*')
        when '?'
          if inCharSet
            buffer.append('?')
          else
            buffer.append(if questionCanMatchZero then '.?' else '.')
        when '['
          inCharSet = true
          buffer.append(pattern[ch])

          if ch + 1 < pattern.length
            switch pattern[ch + 1]
              when '!', '^'
                buffer.append('^')
                ch++
              when ']'
                buffer.append(']')
                ch++
        when ']'
          inCharSet = false
          buffer.append(pattern[ch])
        when '\\'
          buffer.append('\\')
          if ch == pattern.length - 1
            buffer.append('\\')
          else if @__isGlobMetaCharacter(pattern[ch + 1])
            buffer.append(pattern[++ch])
          else
            buffer.append('\\')
        else
          if not inCharSet and @__isRegExpMetaCharacter(pattern[ch])
            buffer.append('\\')
          buffer.append(pattern[ch])

    @regexp = buffer.toString()

    # add subdomains if the pattern was just for the domain
    @regexp = "(.+\\.)?#{@regexp}" if pattern.match(/^[^.*]+\.[^.]+$/)

    # add ^ and $ to force matching the entire input against the pattern
    @regexp = "^#{@regexp}$"

    # add any necessary options
    @mods = ''
    @mods += Globber.CASE_INSENSITIVE_MOD if caseInsensitive

  compile: ->
    return new RegExp(@regexp, @mods)

  toString: ->
    return "/#{@regexp}/#{@mods}"

################################################################################

Globber.CASE_INSENSITIVE_MASK        = 0x0001
Globber.STAR_CANNOT_MATCH_ZERO_MASK  = 0x0002
Globber.QUESTION_CAN_MATCH_ZERO_MASK = 0x0003

Globber.DEFAULT_MASK = Globber.CASE_INSENSITIVE_MASK

Globber.CASE_INSENSITIVE_MOD = 'i'


################################################################################
#
# A StringBuffer class to avoid the costs of string concatenation in JavaScript.
#
################################################################################

class StringBuffer

  constructor: ->
    @buffer = []

  append: (string) ->
    @buffer.push(string)
    @buffer

  toString: ->
    @buffer.join('')


################################################################################

# export Globber
root.Globber = Globber

