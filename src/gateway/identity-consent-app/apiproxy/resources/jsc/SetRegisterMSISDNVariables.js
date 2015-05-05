var msisdn = context.getVariable("msisdn");

context.setVariable	("msisdnNotFound",true);
context.setVariable	("create_msisdn",msisdn);
context.setVariable("process","register");