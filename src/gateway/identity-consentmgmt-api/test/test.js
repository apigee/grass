var assert = require('assert');
var request = require('supertest');
var should = require('should'); 
var config = require('./config.json');
describe('api', function(){
	var url = config.host+'/identity';  
	describe('POST /consents', function(){
    	it('should respond with a 200 status and a consent ID ', function(done){
    		request(url)
    			.post('/consents')
                .set("Authorization",config.auth)
                .send(config.createConsent)
    			.end(function (err, res){
    				if (err){
    					done(err);
				    }   
                res.should.have.property('status', 200);
                console.log(JSON.parse(res.text).consent_id);
				done();
    				
    			})		
      		
		})
  	});
    describe('GET /consents/validate', function(){
        it('should respond with a 200 status  ', function(done){
            request(url)
                .get('/consents/validate?'+config.validateConsent)
                .set("Authorization",config.auth)
                .end(function (err, res){
                    if (err){
                        done(err);
                    }   
                res.should.have.property('status', 200);
                done();
                    
                })      
            
        })
    });

})
