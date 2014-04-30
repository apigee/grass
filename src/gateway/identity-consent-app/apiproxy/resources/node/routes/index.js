/*
 * GET home page.
 */

exports.index = function(req, res) {

  
  if(req.query.open_id == "true"){
    redirect_uri=req.query.redirect_uri;
  }else {
    redirect_uri="/openid/index";
  }


  var userid = req.query.userid;

  if (req.query.renderConsentScreen == "false") {

    res.redirect("/openid/redirect/" + req.query.sessionid)
  }

  else if (userid != null && userid != "") {

  if (req.query.open_id != "true") {

    res.redirect("/openid/profile?sessionid="+req.query.sessionid);

  } else {
      var sessionid = req.param("sessionid");
      res.render('consent', {
        title : 'Consent',
        authenticated : false,
        sessionid : req.param("sessionid"),
        appName : req.query.appName,
        scope : req.query.scope,
        redirectURL : redirect_uri + '?error=refused'
      })
    }

  } else {
    var sessionid = req.param("sessionid");
    console.log("req.param: " + req.param("sessionid"));
    res.render('index', {
      title : 'Home',
      authenticated : false,
      sessionid : req.param("sessionid"),
      redirectURL : redirect_uri + '?error=refused',
      showInvalidLoginMessage : "none" ,
      showInvalidMsisdnMessage : "none" ,
      activeTab : "normal-login"
    })

  }

};

exports.redirect = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.send(200);
};

exports.errorflow = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  res.render('errorflow', {
    title : 'Error',
    authenticated : false,
    error : req.param("error"),
    description : req.param("description"),
    redirectURL : req.query.redirect_uri,
    header : 'Error'
  })
};

exports.login = function(req, res) {

  
  if(req.query.open_id == "true"){
    redirect_uri=req.query.redirect_uri;
  }else {
    redirect_uri="/openid/index";
  }
  
  if (req.query.renderConsentScreen == "false") {

    res.redirect("/openid/redirect/" + req.query.sessionid)
  }

  else if (req.query.userid == null || req.query.userid == "") {
    var sessionid = req.param("sessionid");
    console.log("req.param: " + req.param("sessionid"));
    res.render('index', {
      title : 'Home',
      authenticated : false,
      sessionid : req.param("sessionid"),
      redirectURL : redirect_uri + '?error=refused',
      showInvalidLoginMessage : "true" ,
      showInvalidMsisdnMessage : "none" ,
      activeTab : "normal-login"
    })

  } else {
    // success — user has been logged in
    if (req.query.open_id != "true") {
      
      res.redirect("/openid/profile?sessionid="+req.query.sessionid);

    } else {

      res.render('consent', {
        title : 'Consent',
        authenticated : true,
        sessionid : req.param("sessionid"),
        appName : req.query.appName,
        scope : req.query.scope,
        redirectURL : redirect_uri + '?error=refused'
      })
    }
  }
};

exports.create = function(req, res) {

  if(req.query.open_id == "true"){
    redirect_uri=req.query.redirect_uri;
  }else {
    redirect_uri="/openid/index";
  }
  
  var error = req.query.error;
  if (error != null) {
    
    var sessionid = req.param("sessionid");

    res.render('register', {
      title : 'Register',
      authenticated : false,
      sessionid : req.param("sessionid"),
      showErrorMessage : "true" ,
      error : error
      
    })


    res.render('errorflow', {
      title : 'Error',
      authenticated : false,
      error : error,
      redirectURL : req.query.redirect_uri + '?error=true'
    })
  } else {

    res.render('pin', {
      title : 'Pin',
      authenticated : false,
      sessionid : req.param("sessionid"),
      redirectURL : redirect_uri + '?error=refused',
      showErrorMessage : "none" 

    })

  }
};

exports.reset = function(req, res) {
  
  if(req.query.open_id == "true"){
    redirect_uri=req.query.redirect_uri;
  }else {
    redirect_uri="/openid/index";
  }

  var error = req.query.error;
  if (error != null) {
    var sessionid = req.param("sessionid");

    res.render('recovery', {
      title : 'Forget Password',
      authenticated : false,
      sessionid : req.param("sessionid"),
      showErrorMessage : "true" ,
      error : error
    })

  } else {
    res.render('pin', {
      title : 'Pin',
      sessionid : req.param("sessionid"),
      authenticated : false,
      redirectURL : redirect_uri + '?error=refused',
      showErrorMessage : "none" 
      
    })

  }
};

exports.register = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  var sessionid = req.param("sessionid");
  console.log("req.param: " + req.param("sessionid"));
  res.render('register', {
    title : 'Register',
    authenticated : false,
    sessionid : req.param("sessionid"),
    showErrorMessage : "none" ,
    error : req.query.error
    
  })
};

exports.recovery = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  var sessionid = req.param("sessionid");
  console.log("req.param: " + req.param("sessionid"));
  res.render('recovery', {
    title : 'Forget Password',
    authenticated : false,
    sessionid : req.param("sessionid"),
    showErrorMessage : "none" ,
    error : ""

  })
};

exports.pinSubmit = function(req, res) {
  var error = req.query.error;
  var redirect_uri="";
  if(req.query.open_id == "true"){
    redirect_uri=req.query.redirect_uri;
  }else {
    redirect_uri="/openid/index";
  }
  
  

  if (req.query.renderConsentScreen == "false") {
    res.redirect("/openid/redirect/" + req.query.sessionid)
  }

  else if (error != null || req.query.areMaxTokenTriesExceeded == "true") {
    res.render('errorflow', {
      title : 'Error',
      authenticated : false,
      error : "Maximum attempts are exceeded",
      redirectURL : redirect_uri + '?error=true'
    })

  } else if (req.query.isTokenValidationThrough == "false"){
    
    res.render('pin', {
      title : 'Pin',
      authenticated : false,
      sessionid : req.param("sessionid"),
      redirectURL : redirect_uri + '?error=refused',
      showErrorMessage : "true" 
    })
    
  }  else if (req.query.open_id != "true") {
    res.redirect("/openid/profile?sessionid="+req.query.sessionid);

  } else {

    res.render('consent', {
      title : 'Consent',
      authenticated : false,
      sessionid : req.param("sessionid"),
      appName : req.query.appName,
      scope : req.query.scope,
      redirectURL : req.query.redirect_uri + '?error=refused'
    })
  }

};

exports.msisdnsubmit = function(req, res) {
  
  if(req.query.open_id == "true"){
    redirect_uri=req.query.redirect_uri;
  }else {
    redirect_uri="/openid/index";
  }

  if (req.query.userid == null || req.query.userid == "") {
  var sessionid = req.param("sessionid");
  console.log("req.param: " + req.param("sessionid"));
  res.render('index', {
    title : 'Home',
    authenticated : false,
    sessionid : req.param("sessionid"),
    redirectURL : redirect_uri + '?error=refused',
    showInvalidLoginMessage : "none" ,
    showInvalidMsisdnMessage : "true" ,
    activeTab : "sms-login"
  })
} else {
  res.render('pin', {
    title : 'Pin',
    authenticated : false,
    sessionid : req.param("sessionid"),
    redirectURL : redirect_uri + '?error=refused',
    showErrorMessage : "none" 

  })
}
};


exports.myapps = function(req, res) {

  var applications = [];
  var consents = req.body.consents;

  if (consents != null) {
    for ( var i = 0; i < consents.length; i++) {
      var app = {};
      if (consents[i].status != 'active') {
        continue;
      }
      app.name = consents[i].application_name;
      app.scopes = consents[i].scope;
      app.status = consents[i].status;
      app.consentid = consents[i].consent_id;
      applications.push(app);
    }
  }

  res.render('myapps', {title: "My Applications", authenticated : true, applications:applications , sessionid: req.query.sessionid });
}

exports.revokeConsent = function(req, res) {
  res.send(200);
}


exports.Profileupdate=  function(req, res) {
  res.redirect("/openid/profile?sessionid="+req.query.sessionid);
  
}

exports.Profile=  function(req, res) {
  res.render('myprofile',
      {
          title: "My Profile",
          authenticated : true,
          username: req.query.email || '',
          first_name: req.query.first_name || '',
          surname: req.query.surname || '',
          email: req.query.email || '',
          msisdn: req.query.msisdn || '',
          house: req.query.house || '',
          locality: req.query.locality || '',
          street: req.query.street || '',
          landmark: req.query.landmark || '',
          postalcode: req.query.postalcode || '',
          city: req.query.city || '',
          state: req.query.state || '',
          country: req.query.country || '',
          sessionid: req.query.sessionid
          });
}

exports.profileEdit=  function(req, res) {
  res.render('profile_edit', {
    title : 'Profile',
    authenticated : true,
    sessionid : req.query.sessionid,
    username : "",
    email : req.query.email || "",
    surname : req.query.surname || "",
    name : req.query.first_name || "",
    msisdn : req.query.msisdn || "",
    country : req.query.country || "",
    state : req.query.state || "",
    city : req.query.city || "",
    addr1 : req.query.house || "",
    addr2 : req.query.street || ""
  })

}
