

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
, http = require('http'),
engine= require('ejs')
	, store = new express.session.MemoryStore
	, store = new express.session.MemoryStore
  , path = require('path')


var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/index', routes.index);

app.post('/create', routes.create);

app.post('/pin', routes.pin);

app.post('/msisdnsubmit', routes.msisdnsubmit);

app.get('/msisdn', routes.msisdn);

app.post('/pinSubmit', routes.pinSubmit);

app.post('/reset', routes.reset);

app.get('/errorflow', routes.errorflow);

app.post('/redirect/:sessionid', routes.redirect);

app.post('/login', routes.login);

app.get('/register', routes.register);

app.get('/recovery', routes.recovery);

app.post('/myapps', routes.myapps);

app.get('/apps/revoke', routes.revokeConsent);

app.post('/profile/update', routes.Profileupdate);

app.get('/profile', routes.Profile);

app.get('/edit-profile', routes.profileEdit);



app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
