var scope = context.getVariable("scope");
var scopeArray = [];

if (scope != null) {
	scopeArray = scope.split(" ");
}

context.setVariable("scopes", JSON.stringify(scopeArray));
