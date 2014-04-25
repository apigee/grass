var appCallBackUrl = context.getVariable("appCallBackUrl");
var code = "";
if (appCallBackUrl != null && appCallBackUrl != "") {

	urlParts = appCallBackUrl.split("code=");
	if (urlParts.length == 2 && urlParts[1] != null && urlParts[1] != "") {


		if (urlParts[1].indexOf("&") != -1) {

			code = urlParts[1].split("&")[0];

		} else{
			code = urlParts[1];

		}
	}

}
context.setVariable("code",code);