$(function() {
    $(".country-code-dropdown").click(function(){
        var dataRole = $(".caret").attr('data-role');
        //console.log(dataRole);
        if (dataRole == "show") {
            $(".dropdown-container ul:first-child li:first-child").addClass("with-menu");
            $("ul.countries").fadeIn();
            $(".caret").attr('data-role', 'hide');
        } else {
            $(".dropdown-container ul:first-child li:first-child").removeClass("with-menu");
            $("ul.countries").fadeOut(); 
            $(".caret").attr('data-role', 'show');

        }
    });    
    $("ul li.country .text-container").click(function() {
        $("ul.title-dropdown .text-container img").attr("src", $(this).find("img").attr('src'));
	 $("#country-code").attr("value",$(this).attr("value"));
        $("ul.title-dropdown .text-container p").html($(this).find("p").html());
        $(".dropdown-container ul:first-child li:first-child").removeClass("with-menu");
        $("ul.title-dropdown .default-text").removeClass('show').addClass('hide');                        
        $("ul.countries").hide(); 
        $("ul.title-dropdown .text-container").removeClass('hide').addClass('show');
        $("ul.title-dropdown .caret").attr('data-role', 'show');
    });

});
            
 