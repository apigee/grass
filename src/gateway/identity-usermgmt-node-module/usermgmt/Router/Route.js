/* jshint strict: true */
/* jshint unused: true */
/* jshint laxcomma: true */
/* jshint -W014 */
/* jshint -W002, -W004 */
/* jshint -W010, -W020 */
/* jshint -W053, -W084 */
/* global require, module, exports */

var utils = require('./utils');

exports = module.exports = Route;

function Route(method, path, callbacks, options) {
  'use strict';
  options = options || {};
  this.path = path;
  this.method = method;
  this.callbacks = callbacks;
  this.regexp = utils.pathRegexp(path, this.keys = [], options.sensitive, options.strict);
}

Route.prototype.match = function(path) {
  'use strict';
  var keys = this.keys,
    params = this.params = {}, m = this.regexp.exec(path),
    n = 0;

  if (!m) return false;

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1],
      val;

    try {
      val = 'string' == typeof m[i] ? decodeURIComponent(m[i]) : m[i];
    } catch (e) {
      var err = new Error("Failed to decode param '" + m[i] + "'");
      err.status = 400;
      throw err;
    }

    if (key) {
      params[key.name] = val;
    } else {
      params[n++] = val;
    }
  }

  return true;
};