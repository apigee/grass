var no_of_pin_tries = context.getVariable("no_of_pin_tries");
var isTokenValidationThrough = false;
var areMaxTokenTriesExceeded = false;

if (context.getVariable("validate_sms_token_response.status.code") != null
    && context.getVariable("validate_sms_token_response.status.code") == "200") {
  isTokenValidationThrough = true;
}

if (no_of_pin_tries != null && no_of_pin_tries != "") {

  context.setVariable("no_of_pin_tries11",no_of_pin_tries);

  if (!isTokenValidationThrough) {
    context.setVariable("isTokenValidationThrough11",isTokenValidationThrough);
    no_of_pin_tries = parseInt(no_of_pin_tries) + 1;
  }
  if (parseInt(no_of_pin_tries) > 3) {
    areMaxTokenTriesExceeded = true;

  }

} else {
  no_of_pin_tries = 1;
  context.setVariable("no_of_pin_tries","1");


}

context.setVariable("isTokenValidationThrough", isTokenValidationThrough);
context.setVariable("no_of_pin_tries", no_of_pin_tries);
context.setVariable("areMaxTokenTriesExceeded", areMaxTokenTriesExceeded);


context.setVariable("request.queryparam.isTokenValidationThrough", isTokenValidationThrough);
context.setVariable("request.queryparam.no_of_pin_tries", no_of_pin_tries);
context.setVariable("request.queryparam.areMaxTokenTriesExceeded", areMaxTokenTriesExceeded);
