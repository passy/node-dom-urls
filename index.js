'use strict';

var url = require('url');

function _parseURL(urlStr, base) {
  var _url;

  if (base) {
    urlStr = url.resolve(base, urlStr);
  }

  _url = url.parse(
    urlStr,
    /* parseQueryString */ true,
    /* slashesDenoteHost */ true
  );

  if (!_url.protocol) {
    throw new TypeError('Failed to construct URL: Invalid URL');
  }

  return _url;
}

function URL(urlStr, base) {
  this._url = _parseURL(urlStr, base);
}

URL.prototype = {
  toString: function () {
    return this.href;
  },

  get href() {
    return this._url.format();
  },

  set href(value) {
    this._url = _parseURL(value);
  },

  get host() {
    return this._url.host;
  },

  set host(value) {
    // The host value affects multiple attributes, but the `url` module
    // doesn't cascade the changes, so we manually update them.
    var newUrl = url.parse('proto:' + value);

    if (newUrl.port) {
      this._url.port = newUrl.port;
      this._url.host = newUrl.host;
    } else if (this._url.port) {
      this._url.host = newUrl.host + ':' + this._url.port;
    } else {
      this._url.host = newUrl.host;
    }

    this._url.hostname = newUrl.hostname;
  },

  get hostname() {
    return this._url.hostname;
  },

  set hostname(value) {
    // Replace a port if it's in place and treat it like a host change
    // afterwards.
    this.host = value.replace(/(\:.*)?$/, '');
  },

  get protocol() {
    return this._url.protocol;
  },

  set protocol(value) {
    // Strip the colon, including anything following it and replace it with a
    // single one.
    this._url.protocol = value.replace(/(\:.*)?$/, ':');
  },

  get port() {
    // Port should be an empty string (zero ASCII digits) instead of null in DOM
    // land. (Section 4.1)
    return this._url.port || '';
  },

  set port(value) {
    this._url.port = value;
  },

  get pathname() {
    return this._url.pathname;
  },

  set pathname(value) {

  }
};

[
].forEach(function (property) {
  Object.defineProperty(URL.prototype, property, {
    get: function () {
      return this._url[property];
    },
    set: function (value) {
      this._url[property] = value;
    }
  });
});

module.exports = {
  URL: URL
};
