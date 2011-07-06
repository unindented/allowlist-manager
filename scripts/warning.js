(function() {
  var STATE_LOCKED, STATE_UNLOCKED, hostnameElem, hostnameParam, hrefElem, hrefParam, init, initControls, initParams, pathnameElem, pathnameParam, root, setState, urlElem, wrapperElem;
  root = (typeof exports !== "undefined" && exports !== null) ? exports : this;
  STATE_LOCKED = 'locked';
  STATE_UNLOCKED = 'unlocked';
  wrapperElem = null;
  urlElem = null;
  hrefElem = null;
  hostnameElem = null;
  pathnameElem = null;
  hrefParam = null;
  hostnameParam = null;
  pathnameParam = null;
  init = function(event) {
    initParams();
    initControls();
    return setState(STATE_LOCKED);
  };
  initParams = function() {
    hrefParam = decodeURIComponent(Query.href || '');
    hostnameParam = decodeURIComponent(Query.hostname || '');
    return (pathnameParam = decodeURIComponent(Query.pathname || ''));
  };
  initControls = function() {
    wrapperElem = document.getElementById('wrapper');
    urlElem = document.getElementById('url');
    urlElem.href = hrefParam;
    urlElem.title = hrefParam;
    urlElem.textContent = hrefParam;
    hrefElem = document.getElementById('href');
    hostnameElem = document.getElementById('hostname');
    pathnameElem = document.getElementById('pathname');
    hrefElem.value = hrefParam;
    hostnameElem.value = hostnameParam;
    return (pathnameElem.value = pathnameParam);
  };
  setState = function(state) {
    return (wrapperElem.className = state);
  };
  window.addEventListener('load', init, true);
}).call(this);
