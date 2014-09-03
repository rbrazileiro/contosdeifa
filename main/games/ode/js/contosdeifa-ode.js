$( document ).ready(function() {
	// Skrollr
  var s = skrollr.init({
        forceHeight: true,
         constants: {
            ode: 100,
            odes: 1000
        }

    });
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