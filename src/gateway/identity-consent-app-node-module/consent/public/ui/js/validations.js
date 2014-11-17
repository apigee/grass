$(function() {
    if (typeof currentPage != "undefined") {
        if (currentPage == "register" || currentPage == "register_fp") {
        	
           if(!document.getElementById("chkTerms").checked){
               $("#btnContinue").prop("disabled",true);
           }

            $("#txtEmail").blur(function() {
                var emailValue = $(this).val();
                console.log($(this).val());
                if ($.trim(emailValue) != "") {
                    if ( !validateEmail(emailValue)) {
                    $(this).parent().next(".inline-error").html("Enter valid Email").show();
                    } else {
                        $(this).parent().next(".inline-error").hide();
                    }
                } else {
                    $(this).parent().next(".inline-error").html("Email Can not be empty").show();                
                }
            });
            $("#chkTerms").change(function() {

            	if ($(this).is(':checked')) {
            		console.log("here");
                    $("#btnContinue").prop("disabled",false);
                } else {
                    $("#btnContinue").prop("disabled",true);
                }
            });
            $("#btnContinue").click(function(){
              if( !checkEmpty("txtName", "UserName"))
            	  return false;
          
              if( ! checkEmpty("txtPassword", "Password"))
            	  return false;

                if($("#txtPassword").val().length < 6) {
                	$("#txtPassword").parent().next(".inline-error").show();
            		return false;
                }

                if($("#txtPassword").val() != $("#txtConfirmPassword").val()){
                $("#txtConfirmPassword").parent().next(".inline-error").show();
                return false;
                }
                
            });    

        }
        if (currentPage == "login" || currentPage == "login_fp") {
            $("#btnLogin").click(function(){
                if( !checkEmpty("txtName", "UserName"))
              	  return false;
                if( ! checkEmpty("txtPassword", "Password"))
                	  return false;
            });    
        }
        if (currentPage == "login_fp") {
            $("#linkShowMoreIcons").click(function() {
                $(".carousel-inner .item.two, .carousel-inner .item.three").show();
            });
        }
        if (currentPage == "register_fp") {
            $("#linkGoTop").click(function() {
                $("html, body").animate({ scrollTop: 0 }, "slow");
            });
        }

        
    }
});
function checkEmpty(elementId,fieldName) {
    var element = $("#"+elementId);
    var elementVal = $.trim(element.val());
    console.log(elementVal);
    if (elementVal == "") {
        element.parent().next(".inline-error").show();
        return false;
    } else {
        element.parent().next(".inline-error").hide();
        return true;
    }
        
}
function validateEmail(elementValue) {
    var flag = false;
    if (jQuery.trim(elementValue).length > 1) { // Chceck if it is empty.
        var regEx = RegExp(/^[a-zA-Z0-9_]{0,1}([a-zA-Z0-9_\.\-\+\&\/\$\!\#\%\'\*\=\?\^\`\{\|\}\~])+([a-zA-Z0-9_\-\+\&\/\$\!\#\%\'\*\=\?\^\`\{\|\}\~]{0,1})+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        if (regEx.test(elementValue)) {
            if(elementValue.indexOf("..")==-1) flag = true;
        }
    }
    return flag;
}