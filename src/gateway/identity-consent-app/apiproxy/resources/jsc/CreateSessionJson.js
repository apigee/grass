//var sessionVariables="client_id,response_type,scope,userid,password,redirect_uri,pre_page_id,create_msisdn,create_name,create_lastName,create_username,create_password,registrationFlag,resetFalg,socialLoginDetails";

var sessionVariables=context.getVariable("sessionVariables");
sessionVarArray=sessionVariables.split(",");
var json = { };
	for(var i = 0, l = sessionVarArray.length; i < l; i++) {
	  json[sessionVarArray[i]] = context.getVariable(sessionVarArray[i]) || null;
	}

context.removeVariable("session.Payload");  
context.setVariable	("session.Payload",JSON.stringify(json));

