
/*
GET home page.
 */
 
    var Usergrid = require("usergrid");

    var client = new Usergrid.client({
        orgName:'op102-ex',
        appName:'identity',
        authType:Usergrid.AUTH_CLIENT_ID,
        clientId:'b3U6yQvN8aDyEeKC0gLoGsVOBQ',
        clientSecret:'b3U6aJFD4MFn5BUqgew1rRmcBT_e7U8',
       });

    
    
    exports.createConsent = function(req, res){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Content-Type', 'application/json');

        console.log('in the flow to create consent');
        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
          res.send(200);
        }
     
        var now = new Date();
        var utc_now = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
        var current_time=utc_now.getTime()+"";
        var sso_token= null;
	        var scope = null;
        if(req.body.sso_token != null){
        	try{
            sso_token=JSON.parse(JSON.stringify(req.body.sso_token));
        	}
            catch(e){}
        }
	if (req.body.scope != null && req.body.scope != "") {
		try {

			scope = JSON.parse(JSON.stringify(req.body.scope));
		} catch (e) {
		}
	} 
        var consent_id=createGuid();
        var options = {
        	    type:'consents',
        	    name: consent_id,
        	    uuid: consent_id,
        	    developer_id: req.body.developer_id,
        	    application_name: req.body.application_name,
        	    client_id: req.body.client_id,
        	    end_user_id: req.body.end_user_id,
        	    device_type: req.body.device_type,
        	    authorization_code: req.body.authorization_code,
        	    consent_id: consent_id,
        	    access_token: req.body.access_token,
        	    refresh_token: req.body.refresh_token,
        	    scope: scope,
        	    status: req.body.status,
        	    sso_token:sso_token||"",
        	    last_updated: current_time
        	}

        
        
	  client.createEntity(options, function(err, response) {
		if (err) {
			var error={
					"error": "server_error",
					"error_description" : "consent not created"
			}
			res.send(500,error);
		} else {
			if (sso_token != null && sso_token != "undefined"){
				for ( var i in sso_token) {
					
					if (sso_token[i]!= null && sso_token[i].site_id != null && sso_token[i].token !=null){
						
						ssoData={
				        	    type:'ssos',
				        	    name:sso_token[i].token,
	                            token:sso_token[i].token,
	                            site_id: sso_token[i].site_id,
				        	    created_on:current_time,
				        	    consent_id:consent_id
						}
				     	client.createEntity(ssoData, function(err, response) {
				    		if (err) {
				    			var error={
				    					"error": "server_error",
				    					"error_description" : "consent not created"
				    			}
				    			res.send(500,error);
				    			}
				});
			}
		}
			}
			res.send({'consent_id': consent_id, 'last_updated' : current_time});
		}
		}); 

	 

    };
 
    function createGuid()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    
    
    function parseJSON(json)
    {
    	   if(json != null){
    	    	try{
    	        parsedJSon=JSON.parse(JSON.stringify(json));
    	    	return parsedJSon;
    	    	}
    	        catch(e){
    	        	return null;
}
    	    }
        
    }
    
    
    
    
   


    exports.updateConsent = function(req, res) {
    	
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Content-Type', 'application/json');
        console.log('in the flow to create consent');
        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
          res.send(200);
        }

	var consent_id = req.param("consentid");
	console.log("consent_id" + consent_id);

	var now = new Date();
	var utc_now = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
	var current_time = utc_now.getTime()+"";
	
    var sso_token= null;
    sso_token=parseJSON(req.body.sso_token);

	var options = {
		endpoint : "consents",
		qs : {
			ql : "consent_id = " + consent_id
		}
	};

	client.request(options,function(error, response) {

						if (error || response == null || response.entities[0]== null) {
							
							var error={
									"error": "bad_request",
									"error_description" : "consent doesn't exist"
							}
							res.send(400,error);

						} else {
							console.log(response);
							var status = response.entities[0].status;
							if (req.body.status != null
									&& req.body.status != ""
									&& response.entities[0].status != null) {
								if (response.entities[0].status != "active"){
//									status = response.entities[0].status;
									var error={
											"error": "bad_request",
											"error_description" : "revoked or expired consent cannot be updated"
									}
									res.send(400,error);								}
								else{
									status = req.body.status;
								}
							}
							var scope = null;
							if (req.body.scope != null && req.body.scope != "") {
								try{

									scope = JSON.parse(JSON.stringify(req.body.scope));
}
								catch(e){
}								
							} else {
								scope = null;
							}

							var options = {
								method : 'PUT',
								endpoint : 'consents/' + consent_id,
								body : {
									developer_id : response.entities[0].developer_id,
									client_id : response.entities[0].client_id,
					        	    application_name: response.entities[0].application_name,
									end_user_id : response.entities[0].end_user_id,
									device_type : response.entities[0].device_type,
									authorization_code : response.entities[0].authorization_code,
									consent_id : response.entities[0].consent_id,
									access_token : req.body.access_token || response.entities[0].access_token,
									refresh_token : req.body.refresh_token || response.entities[0].refresh_token,
									sso_token : sso_token || response.entities[0].sso_token,
									scope : scope || response.entities[0].scope,
									status : status,
									last_updated : current_time
								}
							}


							client.request(options, function(err, data) {
								if (err) {
									var error={
											"error": "server_error",
											"error_description" : "consent couldn't be updated"
									}
									res.send(500,error);
									} else {

									 var ssos = {        
											 	method :"DELETE",
									    		endpoint :"ssos", 
									    		qs:{ql:"consent_id = "+ consent_id} 
									    	};

									    	client.request(ssos, function (error, response) {
									    		console.log(JSON.stringify(sso_token));
												if (sso_token != null && sso_token != "undefined"){
													for ( var i in sso_token) {
														
														if (sso_token[i]!= null && sso_token[i].site_id != null && sso_token[i].token !=null){
															
															ssoData={
													        	    type:'ssos',
													        	    name:sso_token[i].token,
										                            token:sso_token[i].token,
										                            site_id: sso_token[i].site_id,
													        	    created_on:current_time,
													        	    consent_id:consent_id
															}
													     	client.createEntity(ssoData, function(err, response) {
													    		if (err) {
																	var error={
																			"error": "server_error",
																			"error_description" : "consent couldn't be updated"
																	}
																	res.send(500,error);
													    		}
													});
												}
											}
												}
												
												console.log(options.body);
												var responseJson=options.body;
												res.send(responseJson);
											});
								}
							});
						}
					});
}
 
    
    exports.validateSSO = function(req, res) {
    	
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Content-Type', 'application/json');

        console.log('in the flow to create consent');
        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
          res.send(200);
        }

    	var token = req.query.sso_token;

    	var options = {
    		endpoint : "ssos",
    		qs : {
    			ql : "token = '" + token +"'"
    		}
    	};

    	client.request(options,function(error, response) {

    						if (error || response == null || response.entities[0]== null || response.entities[0].consent_id == null) {
    							var error={
    									"error": "bad_request",
    									"error_description" : "invalid SSO token"
    							}
    							res.send(400,error);
    							
    						} else {
    							var consent_id = response.entities[0].consent_id;
    								
    								var consentQuery = {
    										endpoint : "consents",
    										qs : {
    											ql : "consent_id = " + consent_id
    										}
    									};

    									client.request(consentQuery,function(error, consent) {

    														if (error || consent == null || consent.entities[0]== null || consent.entities[0].sso_token == null) {
    															var error={
    							    									"error": "bad_request",
    							    									"error_description" : "invalid SSO token"
    							    							}
    							    							res.send(400,error);
    							    							
    														} else {
    															
    															var sso_tokenArray=consent.entities[0].sso_token;
    															var requiredSso_token=null;
    															
    															for ( var i in sso_tokenArray) {
    																
    																if (sso_tokenArray[i]!= null && sso_tokenArray[i].token !=null && token == sso_tokenArray[i].token ){
    																	requiredSso_token=sso_tokenArray[i];
    																	
    																}
    													}
    															
    															var responseConsent={
    																	developer_id : consent.entities[0].developer_id,
    													        	    application_name: consent.entities[0].application_name,
    																	client_id : consent.entities[0].client_id,
    																	end_user_id : consent.entities[0].end_user_id,
    																	device_type : consent.entities[0].device_type,
    																	authorization_code : consent.entities[0].authorization_code,
    																	consent_id : consent.entities[0].consent_id,
    																	access_token : consent.entities[0].access_token,
    																	refresh_token : consent.entities[0].refresh_token,
    																	sso_token : requiredSso_token,
    																	scope : consent.entities[0].scope,
    																	status : consent.entities[0].status,
    																	last_updated : consent.entities[0].last_updated
    																}
    															
    															
    														res.send(responseConsent);
    							}
    														
    							});
    								
    						}
    						});
    }
    
    

    exports.getConsent = function(req, res) {
   	 
   	 console.log("in get consent flow");
   	res.header('Access-Control-Allow-Origin', '*');
   	res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
   	res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization'); 
    res.header('Content-Type', 'application/json');

   	console.log('in the flow to get consent');
   	// intercept OPTIONS method
   	if ('OPTIONS' == req.method) 
   	{ 
   		res.send(200); 
   	}
   	
   	var entities=[];
   	var queryString="";
   	var queryParam=null;
   	
   	//Create query as per request parameter
   	if  (req.query.consent_id != null && req.query.consent_id != ""){
   			queryString="consent_id = "+req.query.consent_id;
   			queryParam="consent_id";
   	}else if (req.query.user_id != null && req.query.user_id != ""){
   		queryString="end_user_id = '"+req.query.user_id+"'";
			queryParam="user_id";

   	}else if (req.query.client_id != null && req.query.client_id != ""){
   		queryString="client_id = '"+req.query.client_id+"'";
		queryParam="client_id";

   	}else if  (req.query.developer_id != null && req.query.developer_id != ""){
   		queryString="developer_id = '"+req.query.developer_id+"'";
		queryParam="developer_id";
   	} 
   	else{
   		var error={
				"error": "bad_request",
				"error_description" : "invalid query parameter"
		}
		res.send(400,error);
   		}
   	
   	
   	var options = 
   	{ 		endpoint:'consents', 
   			qs:{ql: queryString}
   	 }
   	

   		if (queryString != null && req.query.consent_id != null) {
   		console.log("retrieving consent against consent_id" + req.query.consent_id);
   		client.request(options,function(error, response) {
   							if (error || response == null || response.entities == null || response.entities.length == 0) {
   								console.log("Error in retrieving consent from app services against consent_id "+req.query.consent_id );
   							//	console.log(JSON.stringify(response));
   								var error={
   										error: "bad_request",
   					   					error_description : "invalid "+ queryParam
   								};
   								res.send(400,error);
   						   		}
   							 else {

   								console.log("app services response for consent_id: "+ JSON.stringify(response) );

   									var entity = {
   										developer_id : response.entities[0].developer_id,
   										client_id : response.entities[0].client_id,
   										end_user_id : response.entities[0].end_user_id,
   										device_type : response.entities[0].device_type,
   										authorization_code : response.entities[0].authorization_code,
						        	    application_name: response.entities[0].application_name,
   										consent_id : response.entities[0].consent_id,
   										access_token : response.entities[0].access_token,
   										refresh_token : response.entities[0].refresh_token,
   										sso_token : response.entities[0].sso_token,
   										scope : response.entities[0].scope,
   										status : response.entities[0].status,
   										last_updated : response.entities[0].last_updated
   									}

   									console.log("consent details"+ JSON.stringify(entity));
   									res.send(entity);
   							}
   						});
   	}
   	else{


   	if (req.query.cursor != null && req.query.cursor!=""){
   		console.log("cursor in req: "+ req.query.cursor);
   		options.qs['cursor']=req.query.cursor;
   		
   	}
   	console.log(JSON.stringify(options));
   	client.request(options, function (error, response) {
   		if (error || response == null || response.entities == null || response.entities.length == 0 ){
			
   			console.log("app services response for "+ queryString + JSON.stringify(response) );
   			console.log("Error in retrieving consents for "+queryString);
   			var error={
   					"error": "bad_request",
   					"error_description" : "invalid "+ queryParam
   			}
   			res.send(400,error);
   	   		}   	
   	  else {
   		 
			console.log("app services response for "+ queryString + JSON.stringify(response) );

   		 for ( var i in response.entities) {
   	
   	if (response.entities[i] != null ){
   	
   		var entity={
   				developer_id : response.entities[i].developer_id,
   				client_id : response.entities[i].client_id,
   				end_user_id : response.entities[i].end_user_id,
   				device_type : response.entities[i].device_type,
   				authorization_code : response.entities[i].authorization_code,
        	    application_name: response.entities[i].application_name,
   				consent_id : response.entities[i].consent_id,
   				access_token : response.entities[i].access_token,
   				refresh_token : response.entities[i].refresh_token,
   				sso_token : response.entities[i].sso_token,
   				scope : response.entities[i].scope,
   				status : response.entities[i].status,
   				last_updated : response.entities[i].last_updated
   			}
   		
   		entities.push(entity);
   	 }
   			 } 

   		 responseJson={
   				 cursor : response.cursor || "",
   		  		 consents : entities,
   		  		 count: response.count
   		 }
   		 
   		 console.log("consents for "+queryString+" "+responseJson);
   		 res.send(responseJson);

   	 }
   		});
   	
   	 }

   	 }; 

