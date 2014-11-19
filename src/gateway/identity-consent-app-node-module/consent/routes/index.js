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

  var requestedDisplay = req.query.display;


  var renderConsentScreen = req.query.renderConsentScreen;
  if (renderConsentScreen == null) {
    renderConsentScreen = true;
  }

  if (renderConsentScreen == "false") {

    res.redirect("/openid/redirect/" + req.query.sessionid)
  }

  else if (userid != null && userid != "") {

  if (req.query.open_id != "true") {

    res.redirect("/openid/profile?sessionid="+req.query.sessionid);

  } else {
      handleConsent(req,res,redirect_uri,false);
    }

  } else {

    handleIndex(req,res,redirect_uri,"none", "none");

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
  handleError(req,res,req.query.redirect_uri,req.param("error"),req.param("description"));


}
function handleIndex(req,res, redirect_uri, invalidLogin, invalidMsisdn) {
    var sessionid = req.param("sessionid");
    var requestedDisplay = req.query.display;

    var appName = req.query.appName;

    var socialLogin = true;
    var smsLogin = true;
    var emailLogin = true;

    if (appName != null) {
        //TODO instead compare the App's AuthPreference custom attribute
        appName = appName.trim();
        if (appName != "") {
          if (appName.toUpperCase() == "IDENTITYAPP") {

              socialLogin = true;
              emailLogin = true;
              smsLogin = false;
          } else if (appName.toUpperCase() == "BANKAPP") {
              smsLogin = true;
              socialLogin = false;
              emailLogin = false;
          }
        }

    }

    res.render('index', {
      title : 'Home',
      req : req,
      layout: template_layout,
      authenticated : false,
      showUserInfoDiv: false,
      sessionid : sessionid,
      redirectURL : redirect_uri + '?error=refused',
      display : requestedDisplay,
      logged_in_user_email:"",
      logged_in_user_first_name:"",
      logged_in_user_surname:"",
      logged_in_user_email:"",
      logged_in_user_image: "",
      showInvalidLoginMessage : invalidLogin,
      showInvalidMsisdnMessage : invalidMsisdn ,
      activeTab : "normal-login",
      socialLoginVisible : socialLogin,
      smsLoginVisible : smsLogin,
      emailLoginVisible : emailLogin,
      email_to_prefill:""
    })
}


function handleConsent(req, res, redirect_uri, isAuthenticated) {

  var user_attribute="";
  var scopes = req.query.scopes;
  var userid = req.query.userid;

  var requestedDisplay = req.query.display;

  var scope_icon="";
  var scope_class="img-circle";
  var app_logo_url =null;
  var userEmail = "";
  var firstName = "";
  var lastName = "";

  if (scopes != null ){
       var scope_array= (scopes.trim()).split(" ") 
       if (scope_array.indexOf("profile") != -1 ){
         scope_icon= req.query.logged_in_user_image || req.query.basepath+"/ui/images/icons/img_smart.jpg";
         user_attribute = req.query.logged_in_user_first_name;
       }else if ( scope_array.indexOf("email") != -1){
         scope_icon= req.query.logged_in_user_image || req.query.basepath+"/ui/images/icons/img_smart.jpg";
         user_attribute = req.query.logged_in_user_email;
       }
       else {
           for(var i=0; i<scope_array.length ; i++) {
               
               if (scope_array[i] == "mobileid" || scope_array[i] == "phone" ) {
                 user_attribute="+"+req.query.formatted_user_msisdn;
                 scope_icon= req.query.basepath+"/ui/images/mobile-circle.png";
                 scope_class="close-img";
                 break;
               }
          }
      } 
  }


  var isShowUserDiv = false;
  if (isAuthenticated == true) {
    isShowUserDiv = true;
  }
  if (userid != null && userid != "") {
    userEmail = userid;
    isShowUserDiv = true;
  }

  tempName = req.query.firstName;
  if (tempName != null) {
    firstName = tempName;
  }

  tempName = req.query.lastName;
  if (tempName != null) {
    lastName = tempName;
  }


   var sessionid = req.param("sessionid");
      res.render('consent', {
        title : 'Consent',
        req : req,
        display : requestedDisplay || '',
        logged_in_user_email : userEmail,
        logged_in_user_first_name: firstName,
        logged_in_user_surname : lastName,
        logged_in_user_image: "",
        authenticated : isAuthenticated,
        sessionid : req.param("sessionid"),
        appName : req.query.appName,
        scope : req.query.scope,
        app_logo_url : "",
        scope_icon : scope_icon,
        scope_class : scope_class,
        showUserInfoDiv:isShowUserDiv,
        user_attribute : user_attribute,
        redirectURL : redirect_uri + '?error=refused'
      });


}

function handleError(req, res, redirect_uri, error, description) {

  res.render('errorflow', {
    title : 'Error',
    authenticated : false,
    error : error,
    description : description || '',
    req : req,
    display : req.query.display || '',
    logged_in_user_email:"",
    logged_in_user_first_name:"",
    logged_in_user_surname:"",
    logged_in_user_email:"",
    logged_in_user_image: "",
    showUserInfoDiv: false,
    redirectURL : redirect_uri + '?error=true'
  });

}

exports.login = function(req, res) {

  
  if(req.query.open_id == "true"){
    redirect_uri=req.query.redirect_uri;
  }else {
    redirect_uri="/openid/index";
  }
  
  // var sess = req.session;
  // requestedDisplay = sess.display;

  if (req.query.renderConsentScreen == "false") {

    res.redirect("/openid/redirect/" + req.query.sessionid);

  }
  
  else if (req.query.userid == null || req.query.userid == "") {
    handleIndex(req,res,redirect_uri,"true","none");



  } else {
    // success — user has been logged in
    if (req.query.open_id != "true") {
      
      res.redirect("/openid/profile?sessionid="+req.query.sessionid);

    } else {
        handleConsent(req,res,redirect_uri,true);

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
      req : req,
      display : req.query.display || '',
      logged_in_user_email:"",
      logged_in_user_first_name:"",
      logged_in_user_surname:"",
      logged_in_user_email:"",
      logged_in_user_image: "",
      showUserInfoDiv: false,
      redirectURL: redirect_uri + '?error=refused',
      error : error
      
    })


    handleError(req,res,req.query.redirect_uri + '?error=true',error,"");

  } else {

    res.render('pin', {
      title : 'Pin',
      req : req,
      display : req.query.display || '',
      logged_in_user_email:"",
      logged_in_user_first_name:"",
      logged_in_user_surname:"",
      logged_in_user_email:"",
      logged_in_user_image: "",
      authenticated : false,
      showUserInfoDiv: false,
      sessionid : req.param("sessionid"),
      redirectURL : redirect_uri + '?error=refused',
      showErrorMessage : "none" 

    })

  }
};

exports.reset = function(req, res) {
  
  // var sess = req.session;
  // requestedDisplay = sess.display;
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
      req : req,
      redirectURL : redirect_uri + '?error=refused',
      display : req.query.display,
      logged_in_user_email:"",
      logged_in_user_first_name:"",
      logged_in_user_surname:"",
      logged_in_user_email:"",
      logged_in_user_image: "",
      authenticated : false,
      showUserInfoDiv: false,
      sessionid : req.param("sessionid"),
      showErrorMessage : "true" ,
      error : error
    });

  } else {
    res.render('pin', {
      title : 'Pin',
      req : req,
      display : req.query.display,
      logged_in_user_email:"",
      logged_in_user_first_name:"",
      logged_in_user_surname:"",
      logged_in_user_email:"",
      logged_in_user_image: "",
      sessionid : req.param("sessionid"),
      authenticated : false,
      showUserInfoDiv: false,
      redirectURL : redirect_uri + '?error=refused',
      showErrorMessage : "none" 
      
    });

  }
}

exports.register = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }


if(req.query.open_id == "true"){
    redirect_uri=req.query.redirect_uri;
  }else {
    redirect_uri="/openid/index";
  }

  var sessionid = req.param("sessionid");
  res.render('register', {
    title : 'Register',
    authenticated : false,
    sessionid : req.param("sessionid"),
    req : req,
    redirectURL : redirect_uri + '?error=refused',
    display : req.query.display,
    logged_in_user_email:"",
    logged_in_user_first_name:"",
    logged_in_user_surname:"",
    logged_in_user_email:"",
    logged_in_user_image: "",
    showUserInfoDiv:false,
    showErrorMessage : "none" ,
    error : req.query.error
    
  })
}

exports.recovery = function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }

  if(req.query.open_id == "true"){
    redirect_uri=req.query.redirect_uri;
  }else {
    redirect_uri="/openid/index";
  }


  var sessionid = req.param("sessionid");
  res.render('recovery', {
    title : 'Forget Password',
    authenticated : false,
    req : req,
    redirectURL : redirect_uri + '?error=refused',
    display : req.query.display,
    logged_in_user_email:"",
    logged_in_user_first_name:"",
    logged_in_user_surname:"",
    logged_in_user_email:"",
    logged_in_user_image: "",
    showUserInfoDiv: false,
    sessionid : req.param("sessionid"),
    showErrorMessage : "none" ,
    error : ""

  });




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

    handleError(req,res,redirect_uri + '?error=true',"Maximum attempts are exceeded","");


  } else if (req.query.isTokenValidationThrough == "false"){
    
    res.render('pin', {
      title : 'Pin',
      authenticated : false,
      sessionid : req.param("sessionid"),
      req : req,
      display : req.query.display,
      logged_in_user_email:"",
      logged_in_user_first_name:"",
      logged_in_user_surname:"",
      logged_in_user_email:"",
      logged_in_user_image: "",
      showUserInfoDiv: false,
    redirectURL : redirect_uri + '?error=refused',
      showErrorMessage : "true" 
    });
    
  }  else if (req.query.open_id != "true") {
    res.redirect("/openid/profile?sessionid="+req.query.sessionid);

  } else {
    handleConsent(req,res,redirect_uri,false);

  }

};

exports.msisdnsubmit = function(req, res) {
  
  if(req.query.open_id == "true"){
    redirect_uri=req.query.redirect_uri;
  }else {
    redirect_uri="/openid/index";
  }


  if (req.query.userid == null || req.query.userid == "") {
  
      handleIndex(req,res,redirect_uri,"none","true");

} else {
  res.render('pin', {
    title : 'Pin',
    req : req,
    display : req.query.display,
    logged_in_user_email:"",
    logged_in_user_first_name:"",
    logged_in_user_surname:"",
    logged_in_user_email:"",
    logged_in_user_image: "",
    authenticated : false,
    showUserInfoDiv: false,
    sessionid : req.param("sessionid"),
    redirectURL : redirect_uri + '?error=refused',
    showErrorMessage : "none" 

  });
}
}


exports.myapps = function(req, res) {

 if(req.query.open_id == "true"){
    redirect_uri=req.query.redirect_uri;
  }else {
    redirect_uri="/openid/index";
  }
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

  res.render('myapps', {title: "My Applications", authenticated : true, applications:applications , sessionid: req.query.sessionid, 
          req : req,
          display : req.query.display || '',
          logged_in_user_email : req.query.email || '',
          logged_in_user_first_name: req.query.first_name,
          logged_in_user_surname : req.query.surname,
          logged_in_user_image: "",
          redirectURL : redirect_uri +'?error=refused',
          showUserInfoDiv : true
      });
}

exports.revokeConsent = function(req, res) {
  res.send(200);
}


exports.Profileupdate=  function(req, res) {
  res.redirect("/openid/profile?sessionid="+req.query.sessionid);
  
}

exports.Profile=  function(req, res) {
   if(req.query.open_id == "true"){
    redirect_uri=req.query.redirect_uri;
  }else {
    redirect_uri="/openid/index";
  }
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
          sessionid: req.query.sessionid,
           req : req,
          display : req.query.display || '',
          logged_in_user_email : req.query.email || '',
          logged_in_user_first_name: req.query.first_name,
          logged_in_user_surname : req.query.surname,
          logged_in_user_image: "",
          redirectURL : redirect_uri +'?error=refused',
          showUserInfoDiv : true
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
    addr2 : req.query.street || "",
    req : req,
    display : req.query.display || '',
    logged_in_user_email : req.query.email || '',
    logged_in_user_first_name: req.query.first_name,
    logged_in_user_surname : req.query.surname,
    logged_in_user_image: "",
    redirectURL : redirect_uri +'?error=refused',
    showUserInfoDiv : true
  })

}
