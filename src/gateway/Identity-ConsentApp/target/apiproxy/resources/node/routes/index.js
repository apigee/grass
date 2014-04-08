
/*
 * GET home page.
 */

    var Usergrid = require("usergrid");

    var client = new Usergrid.client({
        orgName:'op102-ex',
        appName:'identity',
        authType:Usergrid.AUTH_CLIENT_ID,
        clientId:'b3U6yQvN8aDyEeKC0gLoGsVOBQ',
        clientSecret:'b3U6aJFD4MFn5BUqgew1rRmcBT_e7U8',
       });


exports.index = function(req, res){
res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    
    var userid= req.query.userid;
    
    if (req.query.renderConsentScreen == "false"){

    	res.redirect("/openid/redirect/"+req.query.sessionid)
    }
    

    else if (userid != null && userid != "") {

    		if (req.query.open_id != "true"){
			res.render('profile', {
				title : 'profile',
				sessionid : req.query.sessionid,
				userId : req.query.userid,
				redirectURL : req.query.redirect_uri + '?error=refused',
				username : "",
				email : req.query.email||"",
				surname : req.query.surname||"",
				name : req.query.first_name||"",
				msisdn : req.query.msisdn||"",
				country : req.query.country||"",
				state : req.query.state||"",
				city : req.query.city||"",
				addr1 : req.query.house||"",
				addr2 : req.query.street||""
			})

		} else {
			var sessionid = req.param("sessionid");
			res.render('consent', {
				title : 'Consent',
				sessionid : req.param("sessionid"),
				userId : userid,
				appName : req.query.appName,
				scope : req.query.scope,
				redirectURL : req.query.redirect_uri + '?error=refused'
			})
		}

	}else {
    	var sessionid=req.param("sessionid");
        console.log("req.param: " + req.param("sessionid"));
        res.render('index', { title: 'Home' ,
        sessionid :req.param("sessionid") , redirectURL : req.query.redirect_uri+'?error=refused'
    })
    	
    }

  
};


exports.redirect = function(req, res){
      res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.send(200);
};

exports.errorflow = function(req, res){
      res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    res.render('errorflow', { title: 'Error',
    error :req.param("error"),
    description : req.param("description"),redirectURL : req.query.redirect_uri , header : 'Error'
 })
};

exports.login = function(req, res){

	   if (req.query.renderConsentScreen == "false") {

		res.redirect("/openid/redirect/" + req.query.sessionid)
	}

	else if (req.query.userid == null || req.query.userid == "") {
    	var sessionid=req.param("sessionid");
        console.log("req.param: " + req.param("sessionid"));
        res.render('index', { title: 'Home' ,
        sessionid :req.param("sessionid") , redirectURL : req.query.redirect_uri+'?error=refused'
    })
    	
    } else {
        // success — user has been logged in
    		if (req.query.open_id != "true"){
    			  
    			res.render('profile', {
    				title : 'profile',
    				sessionid : req.query.sessionid,
    				userId : req.query.userid,
    				redirectURL : req.query.redirect_uri + '?error=refused',
    				username : "",
    				email : req.query.email||"",
    				surname : req.query.surname||"",
    				name : req.query.first_name||"",
    				msisdn : req.query.msisdn||"",
    				country : req.query.country||"",
    				state : req.query.state||"",
    				city : req.query.city||"",
    				addr1 : req.query.house||"",
    				addr2 : req.query.street||""
    			})
    		}else {

        res.render('consent', { title: 'Consent',
            sessionid :req.param("sessionid") ,userId : req.query.userid , appName : req.query.appName , scope  : req.query.scope, redirectURL : req.query.redirect_uri+'?error=refused'
         })
    		}
    }
};

exports.create = function(req, res) {

	var error = req.query.error;

	if (error != null) {

		res.render('errorflow', {
			title : 'Error',
			error : error,
			redirectURL : req.query.redirect_uri + '?error=true'
		})
	} else {

		res.render('pin', {
			title : 'Pin',
			sessionid : req.param("sessionid"),
			userId : "userId",
			redirectURL : req.query.redirect_uri + '?error=refused'
		})

	}
};

exports.reset = function(req, res) {

	var error = req.query.error;
	if (error != null) {
		res.render('errorflow', {
			title : 'Error',
			error : error,
			redirectURL : req.query.redirect_uri + '?error=true'
		})
	} else {
		res.render('pin', {
			title : 'Pin',
			sessionid : req.param("sessionid"),
			userId : "userId",
			redirectURL : req.query.redirect_uri + '?error=refused'
		})

	}
};







exports.register = function(req, res){
	res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
	    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	    // intercept OPTIONS method
	    if ('OPTIONS' == req.method) {
	      res.send(200);
	    }
	    var sessionid=req.param("sessionid");
	    console.log("req.param: " + req.param("sessionid"));
	    res.render('register', { title: 'Register' ,
	    sessionid :req.param("sessionid")
	})
	};
	
	
	exports.recovery = function(req, res){
		res.header('Access-Control-Allow-Origin', '*');
		    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
		    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		    // intercept OPTIONS method
		    if ('OPTIONS' == req.method) {
		      res.send(200);
		    }
		    var sessionid=req.param("sessionid");
		    console.log("req.param: " + req.param("sessionid"));
		    res.render('recovery', { title: 'Forget Password' ,
		    sessionid :req.param("sessionid")
		})
		};
	

	exports.pinSubmit = function(req, res){
				var error= req.query.error;

				
				if (req.query.renderConsentScreen == "false") {

		res.redirect("/openid/redirect/" + req.query.sessionid)
	}

	else if (error != null) {
		res.render('errorflow', {
			title : 'Error',
			error : error,
			redirectURL : req.query.redirect_uri + '?error=true'
		})
		    
	    } else  if (req.query.open_id != "true"){
    			res.render('profile', {
    				title : 'profile',
    				sessionid : req.query.sessionid,
    				userId : req.query.userid,
    				redirectURL : req.query.redirect_uri + '?error=refused',
    				username : "",
    				email : req.query.email||"",
    				surname : req.query.surname||"",
    				name : req.query.first_name||"",
    				msisdn : req.query.msisdn||"",
    				country : req.query.country||"",
    				state : req.query.state||"",
    				city : req.query.city||"",
    				addr1 : req.query.house||"",
    				addr2 : req.query.street||""
    			})
	
    			
    		}else {
             
	    	res.render('consent', { title: 'Consent', sessionid :req.param("sessionid") , userId : "userId" , appName : req.query.appName , scope  : req.query.scope, redirectURL : req.query.redirect_uri+'?error=refused'  })
    		}

		};	
		
		
			
			exports.msisdnsubmit = function(req, res){

				 if (req.query.userid == null || req.query.userid == "") {
					res.render('errorflow', {
						title : 'Error',
						error : 'Authentication error',
						description : 'msisdn not registered',
						redirectURL : req.query.redirect_uri + '?error=true',
						header : 'Login failed'
					})
				} else {
			        // success — user has been logged in
			    		if (req.query.open_id != "true"){
			    			  
			    			res.render('profile', {
			    				title : 'profile',
			    				sessionid : req.query.sessionid,
			    				userId : req.query.userid,
			    				redirectURL : req.query.redirect_uri + '?error=refused',
			    				username : "",
			    				email : req.query.email||"",
			    				surname : req.query.surname||"",
			    				name : req.query.first_name||"",
			    				msisdn : req.query.msisdn||"",
			    				country : req.query.country||"",
			    				state : req.query.state||"",
			    				city : req.query.city||"",
			    				addr1 : req.query.house||"",
			    				addr2 : req.query.street||""
			    			})

			    			
			    		}else {

			        res.render('consent', { title: 'Consent',
			            sessionid :req.param("sessionid") ,userId : req.query.userid , appName : req.query.appName , scope  : req.query.scope, redirectURL : req.query.redirect_uri+'?error=refused'
			         })
			    		}
			    }
};	
			
