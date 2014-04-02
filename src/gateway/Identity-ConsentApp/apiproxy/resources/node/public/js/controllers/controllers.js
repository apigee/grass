/** Controllers **/

App.ApplicationController = Ember.Controller.extend(App.Utils, {
	init: function(){
		this.GET("http://localhost:8888/grass/config.json", {}).then(function(json){
			if(json == null){
				return;
			}
			App.set('config', json);
		});

	},
	actions:{
		logout: function (){
			App.set('authToken', null);
			this.transitionToRoute('/');
		}
	},
	hasMessage:function(){
		if(App.messages != null){
			return true;
		}
		else{
			return false;
		}
	}.property("App.messages")
	
});

App.IndexController = Ember.Controller.extend(App.Utils, {
	needs: ['application'],
	isConsent: false,
	username: null,
	password: null,
	phonenumber: null,
	actions:{
		normalLogin: function(){
			var self = this;
			if(this.get('isConsent')){
				this.transitionToRoute('consent');
			}
			else{
				this.POST("http://localhost:8888/grass/login.php", {
					username: this.get('username'),
					password: this.get('password')
				}).then(function(json){
					if(json.error != null){
						App.set('error', json.error.message);
					}
					else{
						App.set("authToken", json.authToken);
						self.setMessage("Login successfull", "success");
						self.transitionToRoute('dashboard');
					}
				});
			}
		},
		smsLogin: function(){
			console.log(this.get('phonenumber'))
		},
		socialLogin: function(){

		}
	}
});

App.DashboardController = Ember.Controller.extend({

});

App.ConsentController = Ember.Controller.extend({
	queryParams: ['sessionId', 'userId'],
	sessionId: null,
	userId: null,
	actionPath: function(){
		///redirect/<%= sessionid%>?userId=<%= userId%>
		var qpath = "redirect/"+this.get('sessionId')+"?userId="+this.get("userId");
		return qpath;
	}.property('sessionId', 'userId'),
	actions:{
		allow: function(){
			window.location.href = "https://google.com";
		},
		deny: function(){
			this.transitionToRoute('consent-login');
		}
	}
	
});

App.RegistrationController = Ember.Controller.extend(App.Utils, {
	firstName: null,
	lastName: null,
	email: null,
	phonenumber: null,
	smsphonenumber: null,
	password: null,
	confirmPassword: null,
	actions:{
		registerUser: function (){
			console.log(this.get('email'));
		},
		cancelRegistration: function(){
			this.transitionToRoute('/');
		},
		smsRegisterUser: function (){
			console.log(this.get("smsphonenumber") + " user decided to register using this mobile number");
		}
	},
	required: true
});


App.ResetPasswordController = Ember.Controller.extend(App.Utils, {
	phonenumber: null,
	password: null,
	confirmPassword: null,
	actions:{
		resetPassword: function (){
			console.log(this.get("phonenumber"));
		},
		cancelReset: function (){
			this.transitionToRoute("/");
		}
	}
});
