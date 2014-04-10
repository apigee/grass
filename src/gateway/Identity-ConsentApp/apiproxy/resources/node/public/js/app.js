$(document).ready(function() {
    $('.revoke-consent').click(function(e){
        var consentid = $(this).data("consent-id");
        var application_name = $(this).parents(".panel-collapse").siblings(".panel-heading").find("a").text();
        var permissions = $(this).prev()[0].outerHTML;
        var modalTitle = "Confirm revoking of consent";
        var modalContent = "<div class='confirm-revoke'>"
            modalContent += "<span class='consent-id' style='display:none' data-consent-id='"+consentid+"'></span>";
            modalContent += "<h4>Revoke permissions from "+application_name+"</h4>";
            modalContent += "<p>You are about to revoke the following permissions. You will not be able to use the applications</p>";
            modalContent += permissions;
            modalContent += "</div>";
            $("#grassModal .modal-title").html(modalTitle);
            $("#grassModal .modal-body").html(modalContent);
            $("#grassModal").modal();
        
    });
    
    $("#grassModal").on('hidden', function(){
        $("#grassModal .confirm-revoke").remove();
    });
    
    $("#confirm-revoke-consent").click(function(e){
        
        var consentid = $(this).parent().prev().find('.consent-id').data('consent-id');
        console.log(consentid);
        
        $.ajax({
            url:"/openid/apps/revoke",
            type: 'GET',
            data:{consentid:consentid}
        }).done(function(){
            $("#accordian").find("#"+consentid).remove();
            $('#grassModal').modal('hide');
        });
        
    });
});