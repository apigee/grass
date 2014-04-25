var challenge
  , payload = JSON.parse(context.getVariable('request.content'));

if (payload.type === 'magic') {
  challenge = '456789';
} else {
  var hash = Token();
  challenge = hash.random({length: payload.length, type: payload.type});
}

context.setVariable('token_text', payload.text.replace('{token}', challenge));
context.setVariable('token_challenge', challenge);
context.setVariable('token_expiry', payload.expiry);