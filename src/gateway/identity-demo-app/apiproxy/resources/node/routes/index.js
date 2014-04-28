exports.index = function(req, res) {
  res.render('index', {
    title : 'Home',
    client_id : req.query.client_id,
    redirect_uri : req.query.redirect_uri,
    authorization_req_url : req.query.authorization_req_url
  })
};

exports.error = function(req, res) {
  res.render('error', {
    title : 'Error'
  })
};

exports.callback = function(req, res) {
  res.render('success', {
    title : 'Welcome',
    name : req.query.name || "",
    surname : req.query.surname||""
  })
};