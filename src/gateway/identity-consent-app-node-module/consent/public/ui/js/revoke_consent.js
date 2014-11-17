$(document).ready(function() {
 
    
    $("#grassModal").on('hidden', function(){
        $("#grassModal .confirm-revoke").remove();
    });
    
    $(".revoke-consent").click(function(e){
        
        var clientid = $(this).data("consent-id");
        console.log(clientid);
        
        $.ajax({
            url:"/openid/apps/revoke",
            type: 'GET',
            data:{clientid:clientid}
        }).done(function(){
            $(".consents").find("#"+clientid).remove();
//            $('#grassModal').modal('hide');
        });
        
    });
});
