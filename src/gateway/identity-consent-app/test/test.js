var assert = require('assert');
var request = require('supertest');
var should = require('should'); 
var config = require('./config.json');
describe('api', function(){
	var url = config.host+'/openid';
	describe('POST /login', function(){
    	it('should respond 200 OK for a valid user', function(done){
    		request(url)
    			.post('/login?sessionid='+config.session)
    			.send(config.loginData)
    			.end(function (err, res){
    				if (err){
    					done(err);
    				}
    				res.should.have.property('status', 200);
				    done();
    				
    			})		
  	    })
  	});
    describe('GET /redirect', function(){
        it('should respond 302 for a valid session', function(done){
            request(url)
                .get('/redirect/'+config.session+'?')
                .end(function (err, res){
                    if (err){
                        done(err);
                    }
                    res.should.have.property('status', 302);
                    done();
                    
                })      
        })
    });
})
