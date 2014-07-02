var assert = require('assert');
var request = require('supertest');
var should = require('should'); 
describe('api', function(){
	var url = 'http://darshan1234-test.apigee.net/identity-users/v1';
	describe('POST /users/authenticate', function(){
    	it('should authenticate a valid user', function(done){
    		var data = {"username":"darshan+1@apigee.com",
    					"grant_type":"password",
    					"password":"apigee123"
    				};
    				
    		request(url)
    			.post('/users/authenticate')
    			.send(data)
    			.end(function (err, res){
    				if (err){
    					done(err);
    				}
    				res.should.have.property('status', 200);
				done();
    				
    			})		
      		
		})
  	})
})
