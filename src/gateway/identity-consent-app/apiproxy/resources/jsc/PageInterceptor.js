currentflow = context.getVariable("proxy.pathsuffix");
previousflow = context.getVariable("previousflow") || null;
error = null;
if (currentflow == "/index") {

	if (previousflow != null && previousflow != currentflow) {
		error = "INVALID_SESSION";
	}

} else if (currentflow == "/msisdnsubmit" || currentflow == "/reset"
		|| currentflow == "/create") {

	if (previousflow != "/index" && previousflow != currentflow) {
		error = "INVALID_SESSION";
	}

} else if (currentflow == "/pinSubmit") {

	if (previousflow != "/msisdnsubmit" && previousflow != "/create"
			&& previousflow != "/reset" && previousflow != currentflow) {
		error = "INVALID_SESSION";
	}
} else if (currentflow == "/consent") {

	if (previousflow != "/index" && previousflow != currentflow) {
		error = "INVALID_SESSION";
	}

}

context.setVariable("previousflow", currentflow);

if (error != null) {
	context.setVariable("flowError", error);
}