
var access_token = context.getVariable("access_token");
var site_id = context.getVariable("site_id");
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
else if (site_id == null || site_id == "" )  {
	errorType="invalid_site_id";
	errorDesc = "site_id must not be null";
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
