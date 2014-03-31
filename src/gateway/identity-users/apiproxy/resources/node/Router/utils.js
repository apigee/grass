/* jshint strict: true */
/* jshint unused: true */
/* jshint laxcomma: true */
/* jshint -W002, -W004 */
/* jshint -W010, -W014 */
/* jshint -W020, -W053 */
/* jshint -W084, -W093 */
/* global require, toString, exports */


/**
 * Module dependencies.
 */

var parse = require('url').parse;


/**
 * supported `http` methods
 * 
 * @type {Array}
 */
exports.methods = [
  'get', 'post',
  'delete', 'put',
  'head', 'options'
];


/**
 * Flatten the given `arr`.
 *
 * @param {Array} arr
 * @return {Array}
 * @api private
 */

exports.flatten = function(arr, ret) {
  'use strict';
  var ret = ret || [],
    len = arr.length;
  for (var i = 0; i < len; ++i) {
    if (Array.isArray(arr[i])) {
      exports.flatten(arr[i], ret);
    } else {
      ret.push(arr[i]);
    }
  }
  return ret;
};


/**
 * Parse the `req` url.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @api private
 */

exports.parseUrl = function(req) {
  'use strict';
  var parsed = req._parsedUrl;
  if (parsed && parsed.href == req.url) {
    return parsed;
  } else {
    parsed = parse(req.url);
    if (parsed.auth && !parsed.protocol && ~parsed.href.indexOf('//')) {
      parsed = parse(req.url.replace(/@/g, '%40'));
    }

    return req._parsedUrl = parsed;
  }
};


/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names. For example "/user/:id" will
 * then contain ["id"].
 *
 * @param  {String|RegExp|Array} path
 * @param  {Array} keys
 * @param  {Object} options
 * @return {RegExp}
 * @api private
 */

exports.pathRegexp = function(path, keys, sensitive, strict) {
  'use strict';
  if (toString.call(path) == '[object RegExp]') return path;
  if (Array.isArray(path)) path = '(' + path.join('|') + ')';
  path = path
    .concat(strict ? '' : '/?')
    .replace(/\/\(/g, '(?:/')
    .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function(_, slash, format, key, capture, optional, star) {
      keys.push({
        name: key,
        optional: !! optional
      });
      slash = slash || '';
      return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '') + (star ? '(/*)?' : '');
    })
    .replace(/([\/.])/g, '\\$1')
    .replace(/\*/g, '(.*)');
  return new RegExp('^' + path + '$', sensitive ? '' : 'i');
};