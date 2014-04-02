/**
 * The Grass UI Application 
 * @type Ember Application
 */
App = Ember.Application.create({
	config: null,
	error: null,
	authToken: null,
	messages: null,
});

/**
 * Utility functions
 *
 */

App.Utils = Ember.Mixin.create({
	//success callback for the ajax calls
	ajaxSuccessHandler: function (json){
		if(json.error != null && json.error.code == 201){
			App.set("messages", json.error);
			var self = this;
			self.setMessage(json.error.message, 'danger');
			setTimeout(function (){self.transitionToRoute('/')});
		}
		return json;
	},

	//set up the GET method ajax call 
	GET: function(url, data){
		var settings = {data: data || {}};
		settings.url = url;
		settings.dataType = "json";
		settings.type = 'GET';
		var authToken = App.get('authToken');
		if(authToken != null){
			settings.data.authToken = authToken;
		}
		return this.ajax(settings);
	},
	//setup the POST method ajax call
	POST: function(url, data){
		var settings = {data: data || {}};
		settings.url = url;
		settings.dataType = "json";
		settings.type = "POST";
		var authToken = App.get("authToken");
		if(authToken != null){
			settings.data.authToken = authToken;
		}
		return this.ajax(settings);
	},
	//Make the ajax call with the given settings.
	ajax: function (settings){
		var self = this;
		return $.ajax(settings).then(function(){
			return self.ajaxSuccessHandler.apply(self, $.makeArray(arguments))
		})
	},
	setMessage: function(message, type){
		var messages = {
			"message":message,
			"type":"alert-"+type
		};
		App.set("messages", messages);
	},
	clearMessage: function(){
		App.set("messages", null);
	}
});


/**
 *  Application router
 */
// App.Router.map(function() {
//   this.route("login");
//   this.route("dashboard");
//   this.route("consent-login");
//   this.route("consent");
//   this.route('logout');
//   this.route('registration');
//   this.route('reset-password');
// });





App.AppMessageComponent = Ember.Component.extend(App.Utils, {
	classNames: ['alert', 'alert-dismissable'],
	classNameBindings:["messageType"],
	messageType: function(){
		if(App.messages != null){
			return App.messages.type;
		}
	}.property("App.messages.type"),
	actions:{
		clearMessage: function (){
			this.clearMessage();
		}
	}
});
