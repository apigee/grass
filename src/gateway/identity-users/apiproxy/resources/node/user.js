/* jshint strict: true */
/* jshint unused: true */
/* jshint laxcomma: true */
/* jshint -W010, -W014 */
/* jshint -W020, -W030, -W053 */
/* global require, exports, module */


/**
 * Module dependencies.
 */

var https = require('https')
  , utilf = require('util')
  , url   = require('url');


/**
 * User prototype.
 */

exports = module.exports = User;


/**
 * Custom Error Definitions
 */

function UserNotFoundError() {
  'use strict';
  var err = Error.call(this, 'user not found');

  err.name = 'UserNotFoundError';
  return err;
}

function UserCreateError() {
  'use strict';
  var err = Error.call(this, 'create user error');

  err.name = 'UserCreateError';
  return err;
}

var dataregex = new RegExp('PUT|POST', 'i')
  , json_type = 'application/json'
  , S_BDREQST = 400
  , ByMethods = ['username', 'email', 'msisdn'];


/**
 * Setup User with `options`.
 *
 * Options:
 *
 *   - `host` obviously hostname of the datastore
 *   - `port` where the datastore listens
 *   - `protocol` http | https
 *   - `org` orgname for usergrid
 *   - `app` appname for usergrid
 *   - `client_id` clientid to authenticate
 *   - `client_secret` secret to authenticate
 *
 * @param {Object} options
 * @api public
 */

function User(opts) {
  'use strict';
  opts = opts || {};
  this.host = opts.host || 'api.usergrid.com';
  this.port = opts.port || 443;
  this.protocol = opts.protocol || 'https';
  this.org = opts.org;
  this.app = opts.app;
  this.basepath = utilf.format('/%s/%s/users', this.org, this.app);
  this.client_id = opts.client_id;
  this.client_secret = opts.client_secret;
}


/**
 * Return `options` object to be utilized with
 * `http` | `https` clients.
 *
 * kv:
 *
 *   - `key` select where `key`
 *   - `value` to be used above: key = value
 *   - `method` http request method, defaults to `GET`
 *   - `body` for issuing POST | PUT requests
 *   
 * @api private
 */

User.prototype.getopts = function(kv) {
  'use strict';
  var query = {
    client_id: this.client_id,
    client_secret: this.client_secret
  }, headers = {
      'accept': json_type
    };

  if (dataregex.test(kv.method)) {
    headers['content-type'] = json_type;
  }

  if (kv.key && kv.value) {
    if (kv.key === 'msisdn') {
      kv.value = kv.value.replace(/\+/g, '');
    }
    query.ql = utilf.format(
      "select * where %s = '%s'", kv.key, kv.value
    );
  }

  return {
    hostname: this.host,
    port: this.port,
    agent: false,
    method: kv.method || 'GET',
    body: kv.body || '',
    path: url.format({
      protocol: this.protocol,
      host: this.host,
      pathname: this.basepath,
      query: query
    }),
    headers: headers
  };
};


/**
 * Return `http` | `https` client for interacting
 * with usergrid rest apis.
 *
 * Options:
 *
 *   - `hostname` domain name or IP address
 *   - `port` defaults to 80
 *   - `agent` controls agent behaviour
 *   - `method` http request method, defaults to `GET`
 *   - `body` for issuing POST | PUT requests
 *   - `path` request path; should include querystring
 *   - `headers` object containing request headers
 *   
 * @param {callback} `fn` to invoke upon completion
 * @api private
 */

User.prototype.client = function(opts, callback) {
  'use strict';
  var self = this
    , req = https.request(opts, function(res) {
    var data = '';

    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      var d = JSON.parse(data);
      if (opts.body && d.error) {
        return callback(new UserCreateError(), null);
      } else if (opts.body && d.user) {
        d.user.msisdn = '+' + d.user.msisdn;
        return callback(null, d);
      } else if (opts.body && d.duration) {
        return callback(null, d);
      } else {
        d = d.entities;
        if (!d.length) {
          return callback(new UserNotFoundError(), null);
        }
        return callback(null, self.cleanse(d));
      }
    });
  });

  if (opts.body) req.write(opts.body);
  req.end();

  req.on('error', function(err) {
    callback(err, null);
  });
};


/**
 * cleanse data before sending to client.
 *
 * @api private
 */

User.prototype.cleanse = function(payload) {
  'use strict';
  delete payload[0].json; // weird node from usergrid
  delete payload[0].metadata;
  delete payload[0].type;
  payload[0].msisdn = '+' + payload[0].msisdn;

  return payload.shift();
};


/**
 * parse data before sending to usergrid.
 *
 * @api private
 */

User.prototype.parse = function(req, res, next) {
  'use strict';
  req.on('data', function(chunk) {
    this.body = this.body || '';
    this.body += chunk;
  });

  req.on('end', function() {
    try {
      this.body = JSON.parse(this.body);

      if ((!this.body.username)
        || !(this.body['email-info']
          && this.body['email-info'][0])
        || !(this.body['phone-info']
          && this.body['phone-info'][0])) {
        res.send(S_BDREQST);
      }

        this.body.email = this.body['email-info'][0]
      , this.body.msisdn = this.body['phone-info'][0].replace(/\+/g, '')
      , this.body.picture = this.body['personal-info'].image || '';

      next();
    } catch (err) {
      res.send(S_BDREQST);
    }
  });
};


/**
 * parse auth data.
 *
 * @api private
 */

User.prototype.auth = function(req, res, next) {
  'use strict';
  req.on('data', function(chunk) {
    this.body = this.body || '';
    this.body += chunk;
  });

  req.on('end', function() {
    try {
      this.body = JSON.parse(this.body);

      if (this.body.newpassword) {
        return next();
      }

      if (!this.body.username || !this.body.password) {
        res.send(S_BDREQST);
      }
      
      return next();
    } catch (err) {
      res.send(S_BDREQST);
    }
  });
};


/**
 * optimize `.by(...)` calls with the same code.
 * 
 * works for get:
 *   - by username
 *   - by email
 *   - by msisdn
 *
 * @param {value} getby value
 * @return {fn}   `fn` callback fn
 * @api public
 */

ByMethods.forEach(function(method) {
  'use strict';
  User.prototype['getby' + method] = function(value, fn) {
    var opts = this.getopts({
      key: method,
      value: value
    });

    return this.client(opts, fn);
  };
});


/**
 * CREATE User.
 *
 * @param {body} `user` payload
 * @return {fn}  `fn` callback fn
 * @api public
 */

User.prototype.create = function(body, fn) {
  'use strict';
  var opts = this.getopts({
    method: 'POST',
    body: JSON.stringify(body)
  });

  return this.client(opts, fn);
};


/**
 * Update User.
 *
 * @param {id}   id of `user`
 * @param {body} `user` payload
 * @return {fn}  `fn` callback fn
 * @api public
 */

User.prototype.update = function(id, body, fn) {
  'use strict';
  var opts = this.getopts({
    method: 'PUT',
    body: JSON.stringify(body)
  }); opts.path = opts.path.replace('/users', '/users/' + id);

  return this.client(opts, fn);
};


/**
 * Authenticate User
 *
 * @param {body} `user` payload
 * @return {fn}  `fn` callback fn
 * @api public
 */

User.prototype.token = function(body, fn) {
  'use strict';
  var opts = this.getopts({
    method: 'POST',
    body: JSON.stringify(body)
  }); opts.path = opts.path.replace('/users', '/token');

  return this.client(opts, fn);
};


/**
 * Set Password for User
 *
 * @param {id}   id of `user`
 * @param {body} `user` payload
 * @return {fn}  `fn` callback fn
 * @api public
 */

User.prototype.password = function(id, body, fn) {
  'use strict';
  var opts = this.getopts({
    method: 'POST',
    body: JSON.stringify(body)
  }); opts.path = opts.path.replace('/users', '/users/' + id + '/password');

  return this.client(opts, fn);
};