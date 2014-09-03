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
    // auto play
    // $("#intro_setas").click(function(){
    //     var steps = $(document).scrollTop();
    //     steps+=200;
    //     s.animateTo(steps);
    // });
    $("#intro_setas").each(function () {
        var hovered = false;
        var loop = window.setInterval(function () {
            if (hovered) {
                var steps = $(document).scrollTop();
                steps+=250;
                s.animateTo(steps);
            }
        }, 250);

        $(this).hover(
           function () {
             hovered = true;
           },
           function () {
             hovered = false;
           }
        );
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