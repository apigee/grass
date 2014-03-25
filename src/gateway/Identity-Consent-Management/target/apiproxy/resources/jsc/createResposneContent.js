var responseJson=JSON.parse(context.getVariable("requestPayload"));
var consent_id = context.getVariable("consent_id");
var last_updated = context.getVariable("last_updated");

responseJson.consent_id=consent_id;
responseJson.last_updated=last_updated;

context.setVariable("responsePayload",JSON.stringify(responseJson));
