
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
 , http = require('http')
	, store = new express.session.MemoryStore
  , path = require('path');;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/consents', routes.getConsent);
app.put('/consents/:consentid', routes.updateConsent);
app.post('/consents', routes.createConsent);
app.get('/token/sso/:sso_token', routes.SSOaction);
app.post('/token/sso', routes.createSSO);
app.get('/consents/validate', routes.validateConsent);


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
