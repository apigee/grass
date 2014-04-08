var no_of_pin_tries = context.getVariable("no_of_pin_tries");
var isTokenValidationThrough = false;

if (context.getVariable("validate_sms_token_response.status.code") != null
		&& context.getVariable("validate_sms_token_response.status.code") == "200") {
	isTokenValidationThrough = true;
}

if (no_of_pin_tries != null && no_of_pin_tries != "") {

	if (!isTokenValidationThrough)
		no_of_pin_tries = parseInt(no_of_pin_tries) + 1;

} else {
	context.setVaribale("no_of_pin_tries", 1);
}