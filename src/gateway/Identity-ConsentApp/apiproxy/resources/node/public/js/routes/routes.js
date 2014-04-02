/** Routes for the grass application**/

/**
 * @TODO move the routes into individual js files.
 */

App.ConsentLoginRoute = Ember.Route.extend({
	controllerName: 'Index',
	templateName: 'index',
	setupController: function(controller, model){
		controller.set('isConsent', true);
	}
});

App.AppListRoute = Ember.Route.extend(App.Utils, {
	model: function (){
		var self = this;
		var applications = null;
		return Ember.$.getJSON('http://localhost:8888/grass/applications.json');
	}
})