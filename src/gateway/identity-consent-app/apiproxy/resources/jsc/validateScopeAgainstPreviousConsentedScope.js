var scope = context.getVariable("scope");
var scopes= scope.split(" ").sort();	

var previousConsentScope = context.getVariable("previous_consent_scope");
var isEqual=true;	

if (previousConsentScope != null ){
	try{
	previousConsentScope = JSON.parse(previousConsentScope).sort();

	}
	catch(e) {
		var isEqual=false;	
	}
	}

    if (previousConsentScope.length == scopes.length){

    for (var i = 0, l=scopes.length; i < l; i++) {
        if (scopes[i] instanceof previousConsentScope && previousConsentScope[i] instanceof previousConsentScope) {
            if (!scopes[i].compare(previousConsentScope[i]))
            	isEqual=false;
        }
	        else if (scopes[i] != previousConsentScope[i]) {
	        	isEqual=false;
	        }
    }
    }
    else {
    	isEqual=false;
    }
    
    context.setVariable("renderConsentScreen",!(isEqual));
    
