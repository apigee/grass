/* jshint strict: true */
/* jshint unused: true */
/* jshint laxcomma: true */
/* jshint -W014 */
/* jshint -W002, -W004 */
/* jshint -W010, -W020 */
/* jshint -W053, -W084 */
/* global require, module, exports */


/**
 * Module dependencies.
 */

var http   = require('http')
  , utils  = require('./utils')
  , Route  = require('./Route')
  , domain = require('domain');

require('./request');
require('./response');


/**
 * Application prototype.
 */

exports = module.exports = router;


/**
 * Create a Router application.
 *
 * @return {Function}
 * @api public
 */

function router() {
  'use strict';
  return new Router();
}


/**
 * Setup Router with `options`.
 *
 * Options:
 *
 *   - `caseSensitive` path regex being case-sensitive
 *   - `strict` path regex being strict, for trailing slash
 *
 * @param {Object} options
 * @api public
 */

function Router(options) {
  'use strict';
  if (!(this instanceof Router)) return new Router(options);
  options = options || {};
  var self = this;
  this.map = {};
  this.params = {};
  this.caseSensitive = options.caseSensitive;
  this.strict = options.strict;
  this.dispatch = function router(req, res, next) {
    var d = domain.create();
    d.on('error', function() {
      res.send(500);
    });

    d.add(req);
    d.add(res);
    d.run(function() {
      self._dispatch(req, res, next);
    });
  };
}


/**
 * Dispatch a req, res into the router.
 * Starts pipeline processing.
 *
 * If no _done_ callback is provided, then default
 * error handlers will respond in the event of an
 * error bubbling through the stack.
 *
 * @api private
 */

Router.prototype._dispatch = function(req, res, next) {
  'use strict';
  var self = this;

  (function pass(i, err) {
    var route;

    function nextRoute(err) {
      pass(req._route_index + 1, err);
    }

    req.route = route = self.matchRequest(req, i);
    if (!route) return next(err); // 4xx, 5xx handler

    req.params = route.params;
    i = 0;
    callbacks();

    function callbacks(err) {
      var fn = route.callbacks[i++];
      try {
        if ('route' == err) {
          nextRoute();
        } else if (err && fn) {
          if (fn.length < 4) return callbacks(err);
          fn(err, req, res, callbacks);
        } else if (fn) {
          if (fn.length < 4) return fn(req, res, callbacks);
          callbacks();
        } else {
          nextRoute(err);
        }
      } catch (err) {
        callbacks(err);
      }
    }
  })(0);
};

Router.prototype.matchRequest = function(req, i, head) {
  'use strict';
  var method = req.method.toLowerCase(),
    url = utils.parseUrl(req),
    path = url.pathname,
    routes = this.map,
    i = i || 0,
    route;

  if (!head && 'head' == method) {
    route = this.matchRequest(req, i, true);
    if (route) return route;
    method = 'get';
  }

  if (routes = routes[method]) {
    for (var len = routes.length; i < len; ++i) {
      route = routes[i];
      if (route.match(path)) {
        req._route_index = i;
        return route;
      }
    }
  }
};


/**
 * Create a new Route for the given path.
 * Returns a new `Route` instance for the _path_.
 *
 * Each route contains a separate middleware stack
 * and VERB handlers. Routes are isolated middleware
 * stacks for specific paths.
 *
 * @param {String} path
 * @return {Route}
 * @api public
 */

Router.prototype.route = function(method, path, callbacks) {
  'use strict';
  var method = method.toLowerCase()
    , callbacks = utils.flatten([].slice.call(arguments, 2));

  var route = new Route(method, path, callbacks, {
    sensitive: this.caseSensitive,
    strict: this.strict
  });

  (this.map[method] = this.map[method] || []).push(route);
  return this;
};


/**
 * Special-cased "all" method, applying the given route `path`,
 * middleware, and callback to _every_ HTTP method.
 *
 * @param {String} path
 * @param {Function} ...
 * @return {app} for chaining
 * @api public
 */

Router.prototype.all = function() {
  'use strict';
  var self = this;
  var args = [].slice.call(arguments);
  
  utils.methods.forEach(function(method) {
    self.route.apply(self, [method].concat(args));
  });
  
  return this;
};


/**
 * Delegate `.VERB(...)` calls to `router.VERB(...)`.
 */

utils.methods.forEach(function(method) {
  'use strict';
  Router.prototype[method] = function() {
    var args = [method].concat([].slice.call(arguments));
    this.route.apply(this, args);
    
    return this;
  };
});


// del -> delete alias
Router.prototype.del = Router.prototype.delete;


/**
 * Listen for connections.
 *
 * A node `http.Server` is returned, with this
 * application (which is a `Function`) as its
 * callback. If you wish to create both an HTTP
 * and HTTPS server you may do so with the "http"
 * and "https" modules as shown here:
 *
 *    var http = require('http')
 *      , https = require('https')
 *      , Router = require('Router')
 *      , engine = Router();
 *
 *    http.createServer(app).listen(80);
 *    https.createServer({ ... }, app).listen(443);
 *
 * @return {http.Server}
 * @api public
 */

Router.prototype.listen = function() {
  'use strict';
  var server = http.createServer(this.dispatch);
  return server.listen.apply(server, arguments);
};