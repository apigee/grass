
var session =  context.getVariable("session.Payload");
var sessionVariables=context.getVariable("sessionVariables");

if(session == null){
	context.setVariable("flowError","INVALID_SESSION");
}
else {
	session=JSON.parse(session);
	//var sessionVar="client_id,response_type,scope,userid,password,redirect_uri,pre_page_id,create_msisdn,create_name,create_lastName,create_username,create_password,registrationFlag,resetFalg,socialLoginDetails";
		sessionVarArray=sessionVariables.split(",");
		for(var i = 0, l = sessionVarArray.length; i < l; i++) {
		  context.setVariable(sessionVarArray[i] , session[sessionVarArray[i]]) ;
		}

}