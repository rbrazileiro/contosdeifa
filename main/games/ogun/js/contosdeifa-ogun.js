$( document ).ready(function() {
	// Skrollr
	var s = skrollr.init({
		forceHeight: true,
         constants: {
            ogun: 100,
            oguns: 1000
        }
	});
    $("#preloader").hide();

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