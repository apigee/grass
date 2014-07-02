var assert = require('assert');
var request = require('supertest');
var should = require('should'); 
var config = require('./config.json');
describe('api', function(){
	var url = config.host+'/oauth/v2';
	describe('POST /authorize', function(){
    	it('should respond with a 302 redirect status ', function(done){
    		request(url)
    			.post('/authorize?'+ config.authorizeQueryString)
    			.end(function (err, res){
    				if (err){
    					done(err);
				    }   
                res.should.have.property('status', 302);
				done();
    				
    			})		
      		
		})
  	});
    // describe('GET /authcode', function(){
    //     it('should respond with a authorization code ', function(done){
    //         request(url)
    //             .get('/code?'+config.genAuthCode)
    //             .end(function (err, res){
    //                 if (err){
    //                     done(err);
    //                 }   
    //             res.should.have.property('status', 302);
    //             console.log(res.header.location);
    //             done();
                    
    //             })      
            
    //     })
    // });
    describe('POST /accesstoken', function(){
        it('should respond with a access token ', function(done){
            request(url)
                .post('/accesstoken')
                .send(config.createAccessToken)
                .end(function (err, res){
                    if (err){
                        done(err);
                    }   
                res.should.have.property('status', 200);
                console.log(res.text);
                done();
                    
                })      
            
        })
    });

    

})
