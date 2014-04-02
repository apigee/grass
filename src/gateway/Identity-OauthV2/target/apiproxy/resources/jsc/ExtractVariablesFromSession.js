var sessionJson = context.getVariable("session.Payload");
var obj = JSON && JSON.parse(sessionJson) || $.parseJSON(sessionJson);

context.setVariable("response_type", obj.response_type);
context.setVariable("redirect_uri", obj.redirect_uri);
context.setVariable("scope", obj.scope);
context.setVariable("client_id", obj.client_id);
