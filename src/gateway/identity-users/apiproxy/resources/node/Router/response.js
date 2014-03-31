/* jshint strict: true */
/* jshint unused: true */
/* jshint laxcomma: true */
/* jshint -W002, -W004 */
/* jshint -W010, -W014 */
/* jshint -W020, -W030 */
/* jshint -W053, -W084 */
/* global require, Buffer */


/**
 * Module dependencies.
 */

var http = require('http');


/**
 * Response prototype.
 */

var res = http.ServerResponse.prototype;


/**
 * Set status `code`.
 *
 * @param {Number} code
 * @return {ServerResponse}
 * @api public
 */

res.status = function(code){
  'use strict';
  this.statusCode = code;
  return this;
};


/**
 * Get value for header `field`.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

res.get = function (field) {
    'use strict';
    return this.getHeader(field);
};


/**
 * Set header `field` to `val`, or pass
 * an object of header fields.
 *
 * Examples:
 *
 *    res.set('Foo', ['bar', 'baz']);
 *    res.set('Accept', 'application/json');
 *    res.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
 *
 * Aliased as `res.header()`.
 *
 * @param {String|Object|Array} field
 * @param {String} val
 * @return {ServerResponse} for chaining
 * @api public
 */

res.set =
    res.header = function (field, val) {
        'use strict';
        if (2 == arguments.length) {
            if (Array.isArray(val)) val = val.map(String);
            else val = String(val);
            this.setHeader(field, val);
        } else {
            for (var key in field) {
                this.set(key, field[key]);
            }
        }
        return this;
};


/**
 * Send JSON response.
 *
 * Examples:
 *
 *     res.json(null);
 *     res.json({ user: 'tj' });
 *     res.json(500, 'oh noes!');
 *     res.json(404, 'I dont have that');
 *
 * @param {Mixed} obj or status
 * @param {Mixed} obj
 * @return {ServerResponse}
 * @api public
 */

res.json = function (obj) {
    'use strict';
    if (2 == arguments.length) {
        if ('number' == typeof arguments[1]) {
            this.statusCode = arguments[1];
        } else {
            this.statusCode = obj;
            obj = arguments[1];
        }
    }
    var body = JSON.stringify(obj, undefined, 2);
    this.writeHead(this.statusCode, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.isBuffer(body) ? body.length : Buffer.byteLength(body)
    });
    return this.end(body);
};


/**
 * Send a response.
 *
 * Examples:
 *
 *     res.send(new Buffer('wahoo'));
 *     res.send({ some: 'json' });
 *     res.send('<p>some html</p>');
 *     res.send(404, 'Sorry, cant find that');
 *     res.send(404);
 *
 * @param {Mixed} body or status
 * @param {Mixed} body
 * @return {ServerResponse}
 * @api public
 */

res.send = function (body) {
    'use strict';
    var len;

    // allow status / body
    if (2 == arguments.length) {
        this.statusCode = body;
        body = arguments[1];
    }

    switch (typeof body) {
        // response status
    case 'number':
        this.get('Content-Type') || this.set('Content-Type', 'text/plain');
        this.statusCode = body;
        body = http.STATUS_CODES[body];
        break;
    case 'string':
        this.get('Content-Type') || this.set('Content-Type', 'text/plain');
        break;
    case 'object':
        if (null === body) {
            body = '';
        } else if (Buffer.isBuffer(body)) {
            this.get('Content-Type') || this.set('Content-Type', 'application/binary');
        } else {
            return this.json(body);
        }
        break;
    }

    if (undefined !== body && !this.get('Content-Length')) {
        this.set('Content-Length', len = Buffer.isBuffer(body) ? body.length : Buffer.byteLength(body));
    }

    // strip irrelevant headers
    if (this.statusCode === (204 || 304)) {
        this.removeHeader('Content-Type');
        this.removeHeader('Content-Length');
        this.removeHeader('Transfer-Encoding');
        body = '';
    }

    // respond
    this.end(body);
    return this;
};