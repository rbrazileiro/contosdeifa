$( document ).ready(function() {
	// Skrollr
	var s = skrollr.init({
		forceHeight: true,
         constants: {
            ogun: 100,
            oguns: 1000
        }
	});

    $(function() {          
        $("img.lazy").lazyload({
            event : "sporty"
        });
    });
 
    $(window).bind("load", function() { 
        var timeout = setTimeout(function() { $("img.lazy").trigger("sporty") }, 1000);
    });      

	$("#menu-close").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
        $("#menu-toggle").fadeIn();
    });

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
        $(this).fadeOut();
    });
});