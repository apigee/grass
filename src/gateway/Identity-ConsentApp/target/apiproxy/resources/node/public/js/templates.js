Ember.TEMPLATES["_scopes"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\n    <li class=\"list-group-item\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "scope", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</li>\n  ");
  return buffer;
  }

  data.buffer.push("<ul class=\"list-group\">\n  ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "scope", "in", "application.scopes", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n");
  return buffer;
  
});
Ember.TEMPLATES["app-list"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes, hashContexts, options;
  data.buffer.push("\n      <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n          <h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"accordian\" href=\"#app1\">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></h4>\n        </div>\n        <div id=\"app1\" class=\"panel-collapse collapse\">\n          <div class=\"panel-body\">\n            <p>The application <strong>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "application.name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</strong> can access your</p>\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.partial || (depth0 && depth0.partial)),stack1 ? stack1.call(depth0, "scopes", options) : helperMissing.call(depth0, "partial", "scopes", options))));
  data.buffer.push("\n          </div>\n        </div>\n      </div>\n      ");
  return buffer;
  }

  data.buffer.push("<div class=\"row\">\n  <div class=\"col-xs-12 col-sm-6 col-sm-offset-3\">\n    <div><h4>Your Application Consents</h4></div>\n    <div class=\"panel-group\" id=\"accordian\">\n      ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "application", "in", "model", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </div>\n  </div>\n</div>");
  return buffer;
  
});
Ember.TEMPLATES["consent"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<!-- Consent Page Template -->\n<div class=\"row\">\n  <div class=\"col-xs-12 col-md-6 col-md-offset-3\">\n    <div class=\"consent-page-wrapper\">\n      <div class=\"consent-page\">\n        <div class=\"panel panel-default\">\n          <div class=\"panel-heading\"><h2>Access authorization</h2></div>\n          <div class=\"panel-body\">\n            <div class=\"consent-content\">\n              <p>Application <strong>Grass</strong> is requesting your permission to share the following details</p>\n              <ul class=\"list-group\">\n                <li class=\"list-group-item\">Name</li>\n                <li class=\"list-group-item\">Email Id</li>\n                <li class=\"list-group-item\">Phone Number</li>\n              </ul>\n              <p>Please press <strong>Allow</strong> to authenticate else press <strong>Cancel</strong></p>\n              <div class=\"consent-button\">\n                <form role=\"form\" ");
  hashContexts = {'action': depth0};
  hashTypes = {'action': "STRING"};
  options = {hash:{
    'action': ("actionPath")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || (depth0 && depth0['bind-attr'])),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n                  <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "allow", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" type=\"button\" class=\"btn btn-primary grass-btn\">Allow</button>\n                  <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deny", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" type=\"button\" class=\"btn btn-primary grass-btn\">Cancel</button>\n                </form>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>");
  return buffer;
  
});
Ember.TEMPLATES["dashboard"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<!-- Dashboard Template-->\n<div class=\"row\">\n    <div class=\"col-xs-6 col-xs-offset-3\">\n		<div> Welcome..!! you are now logged in </div>\n	</div>\n</div>\n\n\n");
  
});
Ember.TEMPLATES["edit-profile"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"row\">\n  <div class=\"col-xs-12 col-sm-6 col-sm-offset-3\">\n    <div class=\"grass-form-wrapper\">\n      <form role=\"form\">\n        <div class=\"form-group\">\n          <label>Username:</label>\n          ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          <label>First Name:</label>\n          ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          <label>Last Name:</label>\n          ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          <label>Email:</label>\n          ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          <label>Phone No:</label>\n          ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"address-label\"><strong>Address:</strong></div>\n        <div class=\"form-group\">\n          <label>Street 1:</label>\n          ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          <label>Street 2</label>\n          ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          <label>City:</label>\n          ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          <label>State:</label>\n          ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          <label>Country</label>\n          ");
  hashContexts = {'type': depth0,'class': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'placeholder': ("")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-6\">\n            <div class=\"form-group\">\n              <button type=\"submit\" class=\"btn btn-primary grass-btn\">Update Info</button>\n            </div>\n          </div>\n          <div class=\"col-xs-6\">\n            <div class=\"form-group\">\n              <button type=\"button\" class=\"btn btn-primary grass-btn\">Cancel</button>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>");
  return buffer;
  
});
Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("Register now");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Forgot your password?");
  }

  data.buffer.push("<!-- Login page template -->\n<div class='row'>\n  <div class=\"login-page-wrapper col-xs-12 col-sm-6 col-sm-offset-3\">\n  <ul class=\"nav nav-tabs\">\n    <li class=\"active\"><a href=\"#normal-login\" data-toggle=\"tab\">Login</a></li>\n    <li><a href=\"#sms-login\" data-toggle=\"tab\">SMS Login</a></li>\n    <li><a href=\"#social-login\" data-toggle=\"tab\">Social Login</a></li>\n  </ul>\n  <div class=\"tab-content\">\n    <div class=\"tab-pane active\" id=\"normal-login\">\n      <div class='grass-form-wrapper'>\n        <form role='form' ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "normalLogin", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n          <div class=\"form-group\">\n            ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'valueBinding': ("username"),
    'placeholder': ("Your Username")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n          </div>\n          <div class=\"form-group\">\n            ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'valueBinding': ("password"),
    'placeholder': ("Your Password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n          </div>\n          <div class=\"form-group\">\n            <button type=\"submit\" class=\"btn btn-primary grass-btn\">Sign In</button>\n          </div>\n        </form>\n        <div class=\"login-form-links\">\n          <div class=\"register-link\">\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "registration", options) : helperMissing.call(depth0, "link-to", "registration", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </div>\n          <div class=\"password-reset-link\">\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "reset-password", options) : helperMissing.call(depth0, "link-to", "reset-password", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"tab-pane\" id=\"sms-login\">\n      <div class=\"grass-form-wrapper\">\n        <form role=\"form\" ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "smsLogin", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n          <div class=\"form-group\">\n            <p><strong>Enter your mobile number in the box below</strong></p>\n            ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'valueBinding': ("phonenumber"),
    'placeholder': ("+4973517390347")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            <span class=\"help-block\">By clicking on ''Submit'', a text message with a PIN code will be sent to your mobile. Standard message and data rates may apply. </span>\n          </div>\n          <div class=\"form-group\">\n            <button type=\"submit\" class=\"btn btn-primary grass-btn\">Submit</button>\n          </div>\n        </form>\n      </div>\n    </div>\n    <div class=\"tab-pane\" id=\"social-login\">\n      <div class=\"social-login\">Social Login</div>\n    </div>\n  </div>\n  </div>\n</div>");
  return buffer;
  
});
Ember.TEMPLATES["login"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("Register now");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Forgot your password?");
  }

  data.buffer.push("<!-- Login page template -->\n<div class='row'>\n  <div class=\"login-page-wrapper col-xs-12 col-sm-6 col-sm-offset-3\">\n  <ul class=\"nav nav-tabs\">\n    <li class=\"active\"><a href=\"#normal-login\" data-toggle=\"tab\">Login</a></li>\n    <li><a href=\"#sms-login\" data-toggle=\"tab\">SMS Login</a></li>\n    <li><a href=\"#social-login\" data-toggle=\"tab\">Social Login</a></li>\n  </ul>\n  <div class=\"tab-content\">\n    <div class=\"tab-pane active\" id=\"normal-login\">\n      <div class='grass-form-wrapper'>\n        <form role='form' ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "normalLogin", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n          <div class=\"form-group\">\n            ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'valueBinding': ("username"),
    'placeholder': ("Your Username")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n          </div>\n          <div class=\"form-group\">\n            ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'valueBinding': ("password"),
    'placeholder': ("Your Password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n          </div>\n          <div class=\"form-group\">\n            <button type=\"submit\" class=\"btn btn-primary grass-btn\">Sign In</button>\n          </div>\n        </form>\n        <div class=\"login-form-links\">\n          <div class=\"register-link\">\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "registration", options) : helperMissing.call(depth0, "link-to", "registration", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </div>\n          <div class=\"password-reset-link\">\n            ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || (depth0 && depth0['link-to'])),stack1 ? stack1.call(depth0, "reset-password", options) : helperMissing.call(depth0, "link-to", "reset-password", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"tab-pane\" id=\"sms-login\">\n      <div class=\"grass-form-wrapper\">\n        <form role=\"form\" ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "smsLogin", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n          <div class=\"form-group\">\n            <p><strong>Enter your mobile number in the box below</strong></p>\n            ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'valueBinding': ("phonenumber"),
    'placeholder': ("+4973517390347")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            <span class=\"help-block\">By clicking on ''Submit'', a text message with a PIN code will be sent to your mobile. Standard message and data rates may apply. </span>\n          </div>\n          <div class=\"form-group\">\n            <button type=\"submit\" class=\"btn btn-primary grass-btn\">Submit</button>\n          </div>\n        </form>\n      </div>\n    </div>\n    <div class=\"tab-pane\" id=\"social-login\">\n      <div class=\"social-login\">Social Login</div>\n    </div>\n  </div>\n  </div>\n</div>");
  return buffer;
  
});
Ember.TEMPLATES["profile"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"row\">\n	<div class=\"col-xs-12 col-sm-6 col-sm-offset-3\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\"><h3>My Profile</h3></div>\n      <div class=\"panel-body\">\n        <ul class=\"list-group\">\n          <li class=\"list-group-item\">\n            <span class=\"label label-default\">Username:</span>\n            <span>usersusername</span>\n          </li>\n          <li class=\"list-group-item\">\n            <span class=\"label label-default\">First Name:</span>\n            <span>User's First Name</span>\n          </li>\n          <li class=\"list-group-item\">\n            <span class=\"label label-default\">Last Name:</span>\n            <span>Users Last Name</span>\n          </li>\n          <li class=\"list-group-item\">\n            <span class=\"label label-default\">Email:</span>\n            <span>usersemail@domain.com</span>\n          </li>\n          <li class=\"list-group-item\">\n            <span class=\"label label-default\">Phone No:</span>\n            <span>78785767676</span>\n          </li>\n          <li class=\"list-group-item\">\n            <span class=\"label label-default\">Address:</span>\n            <address>\n              <strong>Street1: </strong><span>Some Street 1</span><br>\n              <strong>Street2: </strong><span>Some Street 2</span><br>\n              <strong>City: </strong><span>Some Country</span><br>\n              <strong>State: </strong><span>Some State</span><br>\n              <strong>Country: </strong><span>Some Country</span><br>\n            </address>\n          </li>\n        </ul>\n      </div>\n    </div>\n	</div>\n</div>");
  
});
Ember.TEMPLATES["registration"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<!-- Registration Page Template -->\n<div class=\"row\">\n  <div class=\"col-xs-12 col-sm-6 col-sm-offset-3\">\n    <div class=\"grass-form-wrapper\">\n      <h4 class=\"register-form-title\">Fill in your details and Register</h4>\n      <form role=\"form\" ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "registerUser", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        <div class=\"form-group\">\n          ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0,'required': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING",'required': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'valueBinding': ("firstName"),
    'placeholder': ("First Name"),
    'required': ("required")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'valueBinding': ("lastName"),
    'placeholder': ("Last Name")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("email"),
    'class': ("form-control"),
    'valueBinding': ("email"),
    'placeholder': ("Email Id")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("tel"),
    'class': ("form-control"),
    'valueBinding': ("phonenumber"),
    'placeholder': ("Phone Number")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'valueBinding': ("password"),
    'placeholder': ("Password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'valueBinding': ("confirmPassword"),
    'placeholder': ("Confirm password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-6\">\n            <div class=\"form-group\">\n              <button type=\"submit\" class=\"btn btn-primary grass-btn\">Register</button>\n            </div>\n          </div>\n          <div class=\"col-xs-6\">\n            <div class=\"form-group\">\n              <button type=\"button\" class=\"btn btn-primary grass-btn\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelRegistration", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Cancel</button>\n            </div>\n          </div>\n        </div>          \n      </form>\n    </div>\n  </div>\n</div>");
  return buffer;
  
});
Ember.TEMPLATES["reset-password"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<!-- Reset Password page template -->\n<div class='row'>\n  <div class=\"login-page-wrapper col-xs-12 col-sm-6 col-sm-offset-3\">\n    <div class=\"grass-form-wrapper\">\n      <form role=\"form\" ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "resetPassword", {hash:{
    'on': ("submit")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\n        <h4 class=\"register-form-title\">Reset your password</h4>\n        <div class=\"form-group\">\n          ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("text"),
    'class': ("form-control"),
    'valueBinding': ("phonenumber"),
    'placeholder': ("Your registered phonenumber")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'valueBinding': ("password"),
    'placeholder': ("New password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"form-group\">\n          ");
  hashContexts = {'type': depth0,'class': depth0,'valueBinding': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'valueBinding': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'valueBinding': ("confirmPassword"),
    'placeholder': ("Confirm new password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-6\">\n            <div class=\"form-group\">\n              <button type=\"submit\" class=\"btn btn-primary grass-btn\">Reset Password</button>\n            </div>\n          </div>\n          <div class=\"col-xs-6\">\n            <div class=\"form-group\">\n              <button type=\"button\" class=\"btn btn-primary grass-btn\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelReset", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Cancel</button>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>");
  return buffer;
  
});
Ember.TEMPLATES["verify-pin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<!-- Verify SMS Pin Page template -->\n<div class=\"row\">\n    <div class=\"col-xs-12 col-sm-6 col-sm-offset-3\">\n      <div class=\"verify-pin-wrapper well\">\n      	<div class=\"grass-form-wrapper\">\n      	 <form role=\"form\" action='' method=\"POST\">\n          <div class=\"form-group\">\n            <p><strong>Verify your mobile number</strong></p>\n            ");
  hashContexts = {'type': depth0,'class': depth0,'name': depth0,'placeholder': depth0};
  hashTypes = {'type': "STRING",'class': "STRING",'name': "STRING",'placeholder': "STRING"};
  options = {hash:{
    'type': ("password"),
    'class': ("form-control"),
    'name': ("otp"),
    'placeholder': ("One time password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || (depth0 && depth0.input)),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n            <span class=\"help-block\">\n              Please enter the <strong>One Time Password</strong> sent to your registered mobile number.\n            </span>\n          </div>\n          <div class=\"form-group\">\n            <button type=\"submit\" class=\"btn btn-primary grass-btn\">Submit</button>\n          </div>\n         </form>\n      	</div>\n      </div>\n    </div>\n</div>");
  return buffer;
  
});
