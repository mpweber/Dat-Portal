/*
	Load more content with jQuery - May 21, 2013
	(c) 2013 @ElmahdiMahmoud
*/   


$(function () {

    $("#lm").slice(0, 1).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $("div:hidden").slice(0, 20).show();
        if ($("div:hidden").length == 0) {
            $("#load").show();
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1000);
    });

});
