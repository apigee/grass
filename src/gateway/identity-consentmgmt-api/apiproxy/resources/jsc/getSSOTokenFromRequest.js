var authHeader = context.getVariable("request.header.Authorization");
var sso_token = null;
if (authHeader != null && authHeader.split(" ").length > 1 && authHeader.split(" ")[0] == "SSO") {
	sso_token = authHeader.split(" ")[1];
	context.setVariable("request.queryparam.sso_token",sso_token);
} else {
	context.setVariable("errorDesc", "Invalid Authorization header");
	context.setVariable("errorType", "Unauthorized");

}
