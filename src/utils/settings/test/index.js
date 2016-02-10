import {loadSettings, saveSettings} from 'utils/settings'

describe('Settings', function () {
  describe('loadSettings', function () {
    it('invokes callback with settings', function (done) {
      loadSettings(function (settings) {
        expect(settings).toEqual({
          blockPages: false,
          blockOthers: false,
          whitelist: jasmine.any(Array)
        })
        done()
      })
    })
  })

  describe('saveSettings', function () {
    it('invokes callback', function (done) {
      saveSettings({blockPages: true}, done)
    })
  })
})
