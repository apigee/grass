
var credentialsJson = context.getVariable("apiProductJSON");
credentials = new String(credentialsJson);
var scope = context.getVariable("scope");
var error = "";
var receivedScope = "";
var receivedScopes = scope.split(" ");
try{
jsonObjectCredentials = JSON.parse(credentialsJson);
}
catch(e){
	
	error="true";
	context.setVariable("error_type", "Invalid_request");
	context.setVariable("error_variable", "scope");

}

if ((error == null || error == "") ){

jsonArray = jsonObjectCredentials.ApiProduct.Scopes.Scope;
appScopes = new Array();
if (jsonArray.constructor == Array) {
	
	appScopes=jsonArray;
} else {
	if ( jsonArray!= null && jsonArray != ""  && JSON.stringify(jsonArray) != "{}"){
		appScopes.push(jsonArray)
		context.setVariable("jsonArray", JSON.stringify(jsonArray));

	}}

context.setVariable("debugMessage appScopes", (appScopes));

var appScopeSize = appScopes.length;
var counter = 0;
for ( var i=0;i<receivedScopes.length;i++) {
	counter = 0;
	context.setVariable("debugMessage","In Outer For loop");
	context.setVariable("debugMessage",receivedScopes[i]);
	receivedScope = receivedScopes[i];
	receivedScope = receivedScope.toUpperCase();
	context.setVariable("debugMessage",receivedScope.toUpperCase());
	for(var j=0; j<appScopes.length; j++) {

		context.setVariable("debugMessage",JSON.stringify(appScopes[j]));
		appScope = appScopes[j].toUpperCase()
		context.setVariable("debugMessage",appScopes[j]);
		if(appScope.indexOf(receivedScope.toUpperCase()) < 0){
			counter++;
		}
	}
	if(counter==appScopeSize)
	{
		context.setVariable("error_type", "Invalid_request");
		context.setVariable("error_variable", "scope");
		break;
	}
}

}

