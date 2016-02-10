import {parse} from 'url'
import {compile} from 'utils/glob'

describe('Glob', function () {
  describe('compile', function () {
    describe('with an empty string', function () {
      const expr = ' '

      it('always matches', function () {
        const url = parse('http://wikipedia.org/')
        expect(compile(expr)(url)).toBe(true)
      })
    })

    describe('with an invalid domain', function () {
      const expr = 'foobar'

      it('always matches', function () {
        const url = parse('http://wikipedia.org/')
        expect(compile(expr)(url)).toBe(true)
      })
    })

    describe('with top-level domain', function () {
      const expr = 'wikipedia.org'

      it('matches the domain with `http`', function () {
        const url = parse('http://wikipedia.org/')
        expect(compile(expr)(url)).toBe(true)
      })

      it('matches the domain with `https`', function () {
        const url = parse('https://wikipedia.org/')
        expect(compile(expr)(url)).toBe(true)
      })

      it('matches a subdomain with `http`', function () {
        const url = parse('http://en.wikipedia.org/')
        expect(compile(expr)(url)).toBe(true)
      })

      it('matches a subdomain with `https`', function () {
        const url = parse('https://en.wikipedia.org/')
        expect(compile(expr)(url)).toBe(true)
      })

      it('does not match a different domain with `http`', function () {
        const url = parse('http://wwikipedia.org/')
        expect(compile(expr)(url)).toBe(false)
      })

      it('does not match a different domain with `https`', function () {
        const url = parse('https://wwikipedia.org/')
        expect(compile(expr)(url)).toBe(false)
      })

      it('does not match a different domain with `http`', function () {
        const url = parse('http://wikipedia.wwikipedia.org/')
        expect(compile(expr)(url)).toBe(false)
      })

      it('does not match a different domain with `https`', function () {
        const url = parse('https://wikipedia.wwikipedia.org/')
        expect(compile(expr)(url)).toBe(false)
      })
    })

    describe('with second-level domain', function () {
      const expr = 'google.co.uk'

      it('matches the domain with `http`', function () {
        const url = parse('http://google.co.uk/')
        expect(compile(expr)(url)).toBe(true)
      })

      it('matches the domain with `https`', function () {
        const url = parse('https://google.co.uk/')
        expect(compile(expr)(url)).toBe(true)
      })

      xit('matches a subdomain with `http`', function () {
        const url = parse('http://en.google.co.uk/')
        expect(compile(expr)(url)).toBe(true)
      })

      xit('matches a subdomain with `https`', function () {
        const url = parse('https://en.google.co.uk/')
        expect(compile(expr)(url)).toBe(true)
      })

      it('does not match a different domain with `http`', function () {
        const url = parse('http://ggoogle.co.uk/')
        expect(compile(expr)(url)).toBe(false)
      })

      it('does not match a different domain with `https`', function () {
        const url = parse('https://ggoogle.co.uk/')
        expect(compile(expr)(url)).toBe(false)
      })

      it('does not match a different domain with `http`', function () {
        const url = parse('http://google.ggoogle.co.uk/')
        expect(compile(expr)(url)).toBe(false)
      })

      it('does not match a different domain with `https`', function () {
        const url = parse('https://google.ggoogle.co.uk/')
        expect(compile(expr)(url)).toBe(false)
      })
    })

    describe('with wildcard top-level domain', function () {
      const expr = 'wikipedia.*'

      it('matches the domain with one top-level domain', function () {
        const url = parse('http://wikipedia.org/')
        expect(compile(expr)(url)).toBe(true)
      })

      it('matches the domain with another top-level domain', function () {
        const url = parse('https://wikipedia.co.uk/')
        expect(compile(expr)(url)).toBe(true)
      })
    })

    describe('with subdomain', function () {
      const expr = 'en.wikipedia.org'

      it('matches the domain with subdomain', function () {
        const url = parse('http://en.wikipedia.org/')
        expect(compile(expr)(url)).toBe(true)
      })

      it('does not match the domain with a different subdomain', function () {
        const url = parse('https://de.wikipedia.org/')
        expect(compile(expr)(url)).toBe(false)
      })
    })

    describe('with wildcard subdomain', function () {
      const expr = '*.wikipedia.org'

      it('matches the domain with one subdomain', function () {
        const url = parse('http://en.wikipedia.org/')
        expect(compile(expr)(url)).toBe(true)
      })

      it('matches the domain with another subdomain', function () {
        const url = parse('https://de.wikipedia.org/')
        expect(compile(expr)(url)).toBe(true)
      })
    })
  })
})
