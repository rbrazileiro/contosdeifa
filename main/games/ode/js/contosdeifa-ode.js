$( document ).ready(function() {
	// Skrollr
  var s = skrollr.init({
        forceHeight: true,
         constants: {
            ode: 100,
            odes: 1000
        }

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