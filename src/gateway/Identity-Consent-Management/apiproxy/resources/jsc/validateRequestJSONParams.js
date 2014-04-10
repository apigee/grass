var client_id = context.getVariable("client_id");
var end_user_id = context.getVariable("end_user_id");
var authorization_code = context.getVariable("authorization_code");
var access_token = context.getVariable("access_token");
var sso_token = context.getVariable("sso_token");
var status = context.getVariable("req_status");
var contentType = context.getVariable("request.header.Content-Type");
var requestContent= context.getVariable("requestPayload");
var company_id= context.getVariable("company_id");
var type= context.getVariable("type");


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
else if (company_id == null || company_id == "") {
	
	errorType="invalid_company_id";
	errorDesc = "company_id can't be null or empty";
} 
else if (client_id == null || client_id == "") {
	errorType="invalid_clientId";
	errorDesc = "clientId can't be null or empty";

} else if (end_user_id == null || end_user_id == "") {
	errorType="invalid_end_user_id";
	errorDesc = "end_user_id can't be null or empty";
}
else if ((authorization_code == null || authorization_code == "") && (access_token == null || access_token == "" )) {
	errorType="invalid_authorization_code or access token";
	errorDesc = "authorization_code or access_token must be present in request";
} 
else if (status == null || status == "" || (status != "active" && status != "revoked" && status != "expired")) {

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

// Check for Valid Request JSON Body
if (requestContent != null && requestContent != ""){
	
	try
	{
	   var json = JSON.parse(requestContent);
	}
	catch(e)
	{
		errorType="bad_request";
		errorDesc = "Invalid request body";
	}
}
context.setVariable("errorDesc", errorDesc);
context.setVariable("errorType", errorType);

