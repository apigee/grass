var access_token = context.getVariable("access_token");
var sso_token = context.getVariable("sso_token");
var status = context.getVariable("status");
var contentType = context.getVariable("request.header.Content-Type");
var requestContent= context.getVariable("request.content");

var errorDesc = null;
var errorType=null;

if (contentType == null || contentType.toUpperCase().indexOf("APPLICATION/JSON") == -1) {
	errorType="bad_request";
	errorDesc = " invalid header Content-Type";
} 

else if (requestContent == null || requestContent == "" ){
	errorType="bad_request";
	errorDesc = "Empty requst body";

}
 else if (access_token !=null && access_token == "") {
		errorType="invalid_access_token";
		errorDesc = "access_token can't be empty";
} 
else if (status != null && (status == "" || (status != "active" && status != "revoked" && status != "expired")))  {
	errorType="invalid_status";
	errorDesc = "status must be active, revoked or expired";
} else if (sso_token != null && sso_token != "") {

	sso_token = JSON.parse(sso_token);

	if (sso_token != "undefined") {

		for ( var i in sso_token) {

			if (sso_token[i] == null || sso_token[i].site_id == null
					|| sso_token[i].token == null || sso_token[i].site_id == ""
					|| sso_token[i].token == "") {
				errorType="invalid_sso_token";
				errorDesc = "token or site is null or empty";
			}
		}
	}

	else {
		errorType="invalid_sso_token";
		errorDesc = "token or site_id is null or empty";
	}
}

if (requestContent != null && requestContent != ""){
	
	try
	{
	   var json = JSON.parse(requestContent);
	}
	catch(e)
	{
		errorType="bad_request";
		errorDesc = "Invalid request body";
	}}

context.setVariable("errorDesc", errorDesc);
context.setVariable("errorType", errorType);
