/* jshint strict: true */
/* jshint unused: true */
/* jshint laxcomma: true */
/* jshint -W010, -W014 */
/* jshint -W030, -W053 */
/* global require, console */


/**
 * Module dependencies.
 */

var pkginfo = require('./package')
  , entity  = require('./user')
  , Router  = require('./Router');


/**
 * Instantiate User Prototype, with
 * org, app, client_id information.
 */

var User = new entity({
  org: pkginfo.org,
  app: pkginfo.app,
  client_id: pkginfo.client_id,
  client_secret: pkginfo.client_secret
});


/**
 * Get the Router instantiated now ..
 */

var engine    = Router()
  , ByMethods = ['username', 'email', 'msisdn']
  , mregex    = {}
  , S_ALL_OKS = 200
  , S_CREATED = 201
  , S_BDREQST = 400
  , S_NTFOUND = 404;

  mregex.username = pkginfo.regex_username
, mregex.email    = pkginfo.regex_email
, mregex.msisdn   = pkginfo.regex_msisdn;


/**
 * Delegate `.VERB(...)` calls to `engine.VERB(...)`.
 *
 * Listens for GET calls:
 *   - by username
 *   - by email
 *   - by msisdn
 */

ByMethods.forEach(function(method) {
  'use strict';
  engine.get(mregex[method], function (req, res) {
    User['getby' + method](req.params[method], function(err, user) {
      if (err) res.send(S_NTFOUND);
      else res.json(S_ALL_OKS, user);
    });
  });
});


/**
 * Expose CREATE User, via engine.post
 */

engine.post(pkginfo.basepath, User.parse, function (req, res) {
  'use strict';
  User.create(req.body, function(err, user) {
    if (err) res.send(S_BDREQST);
    else res.json(S_CREATED, user);
  });
});


/**
 * Update User, via engine.put
 */

engine.put(pkginfo.regex_email, User.parse, function (req, res) {
  'use strict';
  User.update(req.params.email, req.body, function(err, user) {
    if (err) res.send(S_BDREQST);
    else res.json(S_ALL_OKS, user);
  });
});


/**
 * Set Password for a User
 */

engine.post(pkginfo.regex_password, User.auth, function (req, res) {
  'use strict';
  User.password(req.params.username, req.body, function(err, user) {
    if (err) res.send(S_BDREQST);
    else res.json(S_CREATED, user);
  });
});


/**
 * Authenticate User
 */

engine.post(pkginfo.authuri, User.auth, function (req, res) {
  'use strict';
  User.token(req.body, function(err, user) {
    if (err) res.send(S_BDREQST);
    else res.json(S_ALL_OKS, user);
  });
});


/**
 * Listen for unhandled routes, throwing 404
 */

engine.all('*', function (req, res) {
  'use strict';
  res.send(S_NTFOUND);
});


/**
 * Finally, Listen on Port 8000
 */

engine.listen(8000);
console.log('Server running at http://127.0.0.1:8000/');
