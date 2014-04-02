
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
    
    if (userid != null && userid != ""){
    
    var sessionid=req.param("sessionid");
    res.render('consent', { title: 'Consent',
        sessionid :req.param("sessionid") ,userId : userid , appName : req.query.appName , scope  : req.query.scope, redirectURL : req.query.redirect_uri+'?error=refused'
     })
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

    if (req.query.userid == null ||  req.query.userid == "") {
    	res.render('errorflow', { title: 'Error',
    	    error : 'Authentication error',
    	    description : 'Invalid username or password',redirectURL : req.query.redirect_uri+'?error=true' ,header : 'Login failed'
    	 })
    	} else {
        //success — user has been logged in

        res.render('consent', { title: 'Consent',
            sessionid :req.param("sessionid") ,userId : req.query.userid , appName : req.query.appName , scope  : req.query.scope, redirectURL : req.query.redirect_uri+'?error=refused'
         })
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
	
	exports.pinSubmit = function(req, res){
		
		
		

		
		var error= req.query.error;

	    if (error != null){
		  	res.render('errorflow', { title: 'Error', error : error , redirectURL : req.query.redirect_uri+'?error=true'
	    	 })
		    
	    } else {
	    	res.render('consent', { title: 'Consent', sessionid :req.param("sessionid") , userId : "userId" , appName : req.query.appName , scope  : req.query.scope, redirectURL : req.query.redirect_uri+'?error=refused'  })

	    }

//		res.header('Access-Control-Allow-Origin', '*');
//		    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
//		    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//		    // intercept OPTIONS method
//		    if ('OPTIONS' == req.method) {
//		      res.send(200);
//		    }
//		    var pin = req.body.pin;
//			var username = req.query.username;
//	    	var password = req.query.password;
//	    	var name=  req.query.name;
//	    	var msisdn=  req.query.msisdn;
//	    	var lastName=req.query.lastName;
//	    	 
//		    if(req.body.pin == "123654"){
//		    	 var userId = req.query.userId;

//		    if(req.query.process == null || (req.query.process != "create" && req.query.process != "reset")){	
//
//	                res.render('consent', { title: 'Consent',
//	                    sessionid :req.param("sessionid") ,userId : userId , appName : req.query.appName , scope  : req.query.scope, redirectURL : req.query.redirect_uri+'?error=refused'
//	                 })
//		    }
//		    else if (req.query.process == "create"){
//		    	    var options = {
//		    	        type:"user",
//		    	        name:name,
//		    	        surname:lastName,
//		    	        username:username,
//		    	    	email: username,
//		    	    	tel:msisdn,
//		    	    	password:password,
//		    	    	
//		    	        };
//		    	        client.createEntity(options, function(error, response){
//		    	        	if(error) {
//			    	        	console.log("create user error "+error);
//
//		    	        		res.render('errorflow', { title: 'Error',
//		    	            	    error : 'Registration Failed',
//		    	            	    description : 'EmailId or Username already registerd',redirectURL : req.query.redirect_uri+'?error=true' ,header : "Registeration Failed" 
//		    	            	 })
//		    	        	} else {
//		    	        	console.log("create user response "+response);
//		    	        		res.render('consent', { title: 'Consent',
//	                    sessionid :req.param("sessionid") ,userId : response._data.uuid , appName : req.query.appName , scope  : req.query.scope, redirectURL : req.query.redirect_uri+'?error=refused'
//	                 })
//		    	        	}
//		    	        }); 	
//		    	
//			    	
//		    }
//		    else if (req.query.process == "reset"){
//		    	var options = {
//		    		    method:'PUT',
//		    		    endpoint:'users/'+userId+'/password',
//		    		    body:{ newpassword:password}
//		    		};
//		    		client.request(options, function (err, data) {
//		    		    if (err) {
//		    	        	console.log("reset user error "+error);
//
//		    		    	res.render('errorflow', { title: 'Error',
//	    	            	    error : 'Password Resetting failed',
//	    	            	    description : '',redirectURL : req.query.redirect_uri+'?error=true' ,header : "Something went wrong" 
//	    	            	 })
//		    		    
//		    		    } else {
//		    	        	console.log("reset user data "+data);
//
//		    		    	 res.render('consent', { title: 'Consent',
//		 	                    sessionid :req.param("sessionid") ,userId : userId , appName : req.query.appName , scope  : req.query.scope, redirectURL : req.query.redirect_uri+'?error=refused'
//		 	                 })
//		    		    
//		    		    }
//		    		});
//		    	
//		    }
//		    
//		    
		    
//		    }else{
//		    	
//		    	res.render('errorflow', { title: 'Error',
//            	    error : 'Invalid Pin',
//            	    description : 'Pin entered by you is incorrect',redirectURL : req.query.redirect_uri+'?error=true' ,header : "Authentication failed"
//            	 })
//		    }

		};	
		
		
			
			exports.msisdnsubmit = function(req, res){
				res.header('Access-Control-Allow-Origin', '*');
				    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
				    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
				    // intercept OPTIONS method
				    if ('OPTIONS' == req.method) {
				      res.send(200);
				    }
				    var msisdn = req.body.msisdn;
				    var options = {
				    		endpoint:"users", 
				    		qs:{ql:"tel = '"+encodeURIComponent(msisdn)+"' limit = 1"} 
				    	};

				    	client.request(options, function (error, response) {
				    		if (error || response.entities[0] == null){
				    		
				    			res.render('errorflow', { title: 'Error',
				            	    error : 'Authentication error',
				            	    description : 'Enterd mobile no doesn\'t exists in database',redirectURL : req.query.redirect_uri+'?error=true' ,header : "Login failed"
				            	 })				    		
				    		} else {
				    							    		
				    			 res.render('pin', { title: 'Pin',
				                     sessionid :req.param("sessionid") ,userId : response.entities[0].uuid ,redirectURL : req.query.redirect_uri+'?error=refused'
				                  })
				    		
				    		}	
				    	});
	

				};	
			
