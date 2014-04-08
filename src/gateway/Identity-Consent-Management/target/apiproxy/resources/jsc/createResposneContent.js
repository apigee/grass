var responseJson=JSON.parse(context.getVariable("requestPayload"));
var consent_id = context.getVariable("consent_id");
var last_updated = context.getVariable("last_updated");
var sso_token= context.getVariable("last_updated");
var application_name=context.getVariable("application_name");

responseJson.consent_id=consent_id;
responseJson.last_updated=last_updated;
responseJson.application_name=application_name;

if (sso_token == null || sso_token ==""){
	responseJson.sso_token=[];

}
context.setVariable("responsePayload",JSON.stringify(responseJson));
