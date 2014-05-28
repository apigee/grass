/* jshint strict: true */
/* jshint unused: true */
/* jshint laxcomma: true */
/* jshint -W014 */
/* jshint -W002, -W004 */
/* jshint -W010, -W020 */
/* jshint -W053, -W084 */
/* global require */


/**
 * Module dependencies.
 */

var http = require('http'),
    utils = require('./utils');


/**
 * Request prototype.
 */

var req = http.IncomingMessage.prototype;


/**
 * Return the value of param `name` when present or `defaultValue`.
 *
 *  - Checks route placeholders, ex: _/user/:id_
 *  - Checks body params, ex: id=12, {"id":12}
 *  - Checks query string params, ex: ?id=12
 *
 * To utilize request bodies, `req.body`
 * should be an object. This can be done by using
 * the `bodyParser()` middleware.
 *
 * @param {String} name
 * @param {Mixed} [defaultValue]
 * @return {String}
 * @api public
 */

req.param = function (name, defaultValue) {
    'use strict';
    var params = this.params || {};
    var body = this.body || {};
    var query = this.query || {};
    if (null !== params[name] && params.hasOwnProperty(name)) return params[name];
    if (null !== body[name]) return body[name];
    if (null !== query[name]) return query[name];
    return defaultValue;
};


/**
 * Return the protocol string "http" or "https"
 * when requested with TLS.
 *
 * @return {String}
 * @api public
 */

req.__defineGetter__('protocol', function () {
    'use strict';
    if (this.connection.encrypted) return 'https';
    var proto = this.headers['X-Forwarded-Proto'] || 'http';
    return proto.split(/\s*,\s*/)[0];
});


/**
 * Short-hand for:
 *
 *    req.protocol == 'https'
 *
 * @return {Boolean}
 * @api public
 */

req.__defineGetter__('secure', function () {
    'use strict';
    return 'https' == this.protocol;
});


/**
 * Return the remote address.
 *
 * @return {String}
 * @api public
 */

req.__defineGetter__('ip', function () {
    'use strict';
    return this.ips[0] || this.connection.remoteAddress;
});


/**
 * Short-hand for `url.parse(req.url).pathname`.
 *
 * @return {String}
 * @api public
 */

req.__defineGetter__('path', function () {
    'use strict';
    return utils.parseUrl(this).pathname;
});


/**
 * Parse the "Host" header field hostname.
 *
 * @return {String}
 * @api public
 */

req.__defineGetter__('host', function () {
    'use strict';
    var host = this.headers.Host;
    if (!host) return;
    return host.split(':')[0];
});