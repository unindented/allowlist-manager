(function() {
  var Config, DEFAULT_OPTIONS, root;
  root = (typeof exports !== "undefined" && exports !== null) ? exports : this;
  DEFAULT_OPTIONS = {
    'filter_enabled': false,
    'filter_entries': ['bing.*', 'google.*', 'yahoo.*']
  };
  Config = {
    checkFilter: function(hostname, pathname) {
      var _i, _len, _ref, entry, regexp;
      if (!(hostname != null)) {
        return false;
      }
      if (!Config.isFilterEnabled()) {
        return true;
      }
      _ref = Config.getFilterEntries();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
        regexp = new Globber(entry).compile();
        if (hostname.match(regexp)) {
          return true;
        }
      }
      return false;
    },
    isFilterEnabled: function() {
      return Config.getOption('filter_enabled') === 'true';
    },
    setFilterEnabled: function(enabled) {
      return Config.setOption('filter_enabled', enabled ? 'true' : 'false');
    },
    getFilterEntries: function() {
      return Config.getOption('filter_entries', true);
    },
    setFilterEntries: function(entries) {
      return Config.setOption('filter_entries', entries, true);
    },
    getOption: function(key, json) {
      var value;
      if (!(key != null)) {
        return null;
      }
      value = localStorage.getItem(key);
      if (json) {
        value = JSON.parse(value);
      }
      return value || DEFAULT_OPTIONS[key];
    },
    setOption: function(key, value, json) {
      if (!(key != null) || !(value != null)) {
        return null;
      }
      if (json) {
        value = JSON.stringify(value);
      }
      return localStorage.setItem(key, value);
    },
    clearOptions: function() {
      return localStorage.clear();
    }
  };
  root.Config = Config;
}).call(this);
