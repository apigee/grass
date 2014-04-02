var appCallBackUrl = context.getVariable("appCallBackUrl");
var code = "";
if (appCallBackUrl != null && appCallBackUrl != "") {

	urlParts = appCallBackUrl.split("code=");
	context.setVariable("debug",urlParts[1]);
	if (urlParts.length == 2 && urlParts[1] != null && urlParts[1] != "") {

		context.setVariable("debug",urlParts.length);

		if (urlParts[1].indexOf("&") != -1) {
	
			context.setVariable("debug3",urlParts.length);


			code = urlParts[1].split("&")[0];
			context.setVariable("debug4",urlParts[1].split("&")[0]);

		} else{
			code = urlParts[1];
			context.setVariable("debug4",urlParts[1]);

		}
	}

}
context.setVariable("code",code);