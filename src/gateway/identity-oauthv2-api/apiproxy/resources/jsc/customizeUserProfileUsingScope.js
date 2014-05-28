var scope= context.getVariable("accesstoken.scope");
var scopes = "";
userProfileJson={};

if (scope != null){
	
	scopes=scope.split(" ");
}

for (var i in scopes){
	if (scopes[i] == "profile"){
		
		pushVariableToUserProfileJson("name");
		pushVariableToUserProfileJson("family_name");
		pushVariableToUserProfileJson("given_name");
		pushVariableToUserProfileJson("middle_name");
		pushVariableToUserProfileJson("nickname");
		pushVariableToUserProfileJson("preferred_username");
		pushVariableToUserProfileJson("profile");
		pushVariableToUserProfileJson("picture");
		pushVariableToUserProfileJson("website");
		pushVariableToUserProfileJson("gender");
		pushVariableToUserProfileJson("birthdate");
		pushVariableToUserProfileJson("zoneinfo");
		pushVariableToUserProfileJson("locale");
		pushVariableToUserProfileJson("updated_at");

		
	}
	if (scopes[i] == "email"){
		pushVariableToUserProfileJson("email");

	}
	if (scopes[i] == "address"){
		pushVariableToUserProfileJson("address");

	}
	if (scopes[i] == "phone"){
		pushVariableToUserProfileJson("phone_number");
	}
	
	
}

context.setVariable("userProfileJson", JSON.stringify(userProfileJson));

function pushVariableToUserProfileJson(attribute){
	if (    context.getVariable(attribute) != null &&  context.getVariable(attribute) != "" ){
		userProfileJson[attribute]=context.getVariable(attribute);
	}

} 
