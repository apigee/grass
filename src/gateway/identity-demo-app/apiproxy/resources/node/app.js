

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
, hbs = require('express-hbs');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options', { layout: false });
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
app.get('/error', routes.error);
app.get('/callback', routes.callback);


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
