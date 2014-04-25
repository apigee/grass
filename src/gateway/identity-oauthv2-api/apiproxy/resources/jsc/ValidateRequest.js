var verb = context.getVariable("request.verb");

var response_type = null;
var scope = null;
var client_id = null;
var redirect_uri = null;
var state = null;
var nonce = null;
var display = null;
var login_hint = null;


if (verb == "POST") {
	response_type = context.getVariable("request.formparam.response_type");
	scope = context.getVariable("request.formparam.scope");
	client_id = context.getVariable("request.formparam.client_id");
	redirect_uri = context.getVariable("request.formparam.redirect_uri");
	state = context.getVariable("request.formparam.state");
	nonce = context.getVariable("request.formparam.nonce");
	display = context.getVariable("request.formparam.display");
	login_hint = context.getVariable("request.formparam.login_hint");

}

if (verb == "GET") {
	response_type = context.getVariable("request.queryparam.response_type");
	scope = context.getVariable("request.queryparam.scope");
	client_id = context.getVariable("request.queryparam.client_id");
	redirect_uri = context.getVariable("request.queryparam.redirect_uri");
	state = context.getVariable("request.queryparam.state");
	nonce = context.getVariable("request.queryparam.nonce");
	display = context.getVariable("request.queryparam.display");
	login_hint = context.getVariable("request.queryparam.login_hint");

}


 if(isEmptyOrNull(response_type)){
	context.setVariable("error_type", "bad_request");
	context.setVariable("error_variable", "response_type");

}else if(isEmptyOrNull(client_id)){
	context.setVariable("error_type", "bad_request");
	context.setVariable("error_variable", "client_id");

}else if(isEmptyOrNull(redirect_uri)){
	context.setVariable("error_type", "Invalid_request");
	context.setVariable("error_variable", "redirect_uri");

}else if(isEmptyOrNull(state) ){
	context.setVariable("error_type", "Invalid_request");
	context.setVariable("error_variable", "state");
}
else if (isEmptyOrNull(scope) || (scope.toLowerCase()).indexOf("openid") == -1){
	context.setVariable("error_type", "Invalid_request");
	context.setVariable("error_variable", "scope");
}
else {
	context.setVariable("response_type", response_type);
	context.setVariable("scope", scope);
	context.setVariable("client_id", client_id);
	context.setVariable("redirect_uri", redirect_uri);
	context.setVariable("state", state);
	context.setVariable("req_state", state);
	context.setVariable("nonce", nonce);
	context.setVariable("display", display);
	context.setVariable("login_hint", login_hint);

}




function isEmptyOrNull(element){
	
if ((element == null) ||(element ==""))	
	return true;
else 
	return false;
}
