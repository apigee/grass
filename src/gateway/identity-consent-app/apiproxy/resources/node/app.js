

/**
 * Module dependencies.
 */

var express = require('express')//framework
  , routes = require('./routes')
, http = require('http'),
engine= require('ejs')
	, store = new express.session.MemoryStore
  , path = require('path')


//for Internalization
var i18n = require("i18n");

var app = module.exports = express.createServer();


// Internalization Configuration

i18n.configure({
    locales: ['es', 'en'],
    //cookie: 'lang',
    directory: __dirname+'/public/ui/locales',
    defaultLocale: 'en'

  });


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(i18n.init);
  app.use(express.static(__dirname + '/public'));//all static html contents
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});




//commented newly added to check cookie issue
 app.use(function(req, res, next) {
     device_type = "";
     template_layout = "layout.ejs"
     if (req.query.basepath == null || req.query.basepath == "")
         req.query.basepath = '/openid';
			//req.query.basepath = ""; //used for testing locally

   if (req.query.is_expired == "true") {
     routes.sessionExpire(req, res);
   } else {
     next();
   }
 });

app.use(app.router);
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
