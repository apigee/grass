package com.grass.identity.JwtSign;

import com.apigee.flow.execution.ExecutionContext;
import com.apigee.flow.execution.ExecutionResult;
import com.apigee.flow.execution.IOIntensive;
import com.apigee.flow.execution.spi.Execution;
import com.apigee.flow.message.MessageContext;

@IOIntensive
public class JWT_Creator implements Execution {


	public ExecutionResult execute(MessageContext msgCtxt,
			ExecutionContext exeCtxt) {
     try{
		String SIGNING_KEY =msgCtxt.getVariable("request.formparam.client_secret");
		String AUD =  msgCtxt.getVariable("request.formparam.client_id");
		String SUB =  msgCtxt.getVariable("userid");
		long AUTH_TIME = Long.parseLong((String) msgCtxt.getVariable("issued_at"));
		String ISSUER = msgCtxt.getVariable("issuer");
		String NONCE=  msgCtxt.getVariable("nonce");
		String token = null;
		
		
		JWT_Handler handler = new JWT_Handler(SUB, AUD, ISSUER,
				AUTH_TIME, SIGNING_KEY, NONCE);
		token = handler.getJWT();
		msgCtxt.setVariable("jws", token);
     }catch (Exception e) {
		e.printStackTrace();
	}
		return ExecutionResult.SUCCESS;
	}
}