Node DOM URLs
=============

A partial implementation of the [W3C URL Spec Draft](https://dvcs.w3.org/hg/url/raw-file/tip/Overview.html) for Node building on top of [URIjs](http://medialize.github.io/URI.js/).

If you find incompatibilities, please [report them](https://github.com/passy/node-dom-urls/issues). Error handling is currently very different from the spec.

Browser Polyfills
-----------------

  - [Joshua Bell's Polyfill](https://github.com/inexorabletash/polyfill/blob/master/url.js)
  - [Eric Arvidsson's Polyfill](https://github.com/arv/DOM-URL-Polyfill)

Installation
------------

`npm install dom-urls`

Example
-------

```js

var URL = require('dom-urls');

var url = new URL('relative', 'http://example.com/sub/');

url.protocol; // 'http:'
url.hostname; // 'example.com'
url.pathname; // '/sub/relative/'

url.host = 'example.net:8080';
url.port; // '8080'
```

Why `URIjs` instead of `url`?
-----------------------------

I tried it first, but Node's own URL module doesn't propagate changes, so
changing the `host` doesn't affect the port and vice-versa and I didn't want to
reimplement all of that myself.
