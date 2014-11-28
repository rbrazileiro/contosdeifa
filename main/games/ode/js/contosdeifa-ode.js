$( document ).ready(function() {
	// Skrollr
  var s = skrollr.init({
        forceHeight: true,
         constants: {
            ode: 100,
            odes: 1000
        }

    });
    $("#intro_setas").each(function () {
        var hovered = false;
        var loop = window.setInterval(function () {
            if (hovered) {
                var steps = $(document).scrollTop();
                steps+=100;
                s.animateTo(steps);
            }
        }, 350);

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

  // Trilha Sonora

  $("#dsp_toada").jPlayer({
      ready: function(event) {
          $(this).jPlayer("setMedia", {
              mp3: "audio/toada_ode.mp3"
          });
      },
      ended: function() { // The $.jPlayer.event.ended event
          $(this).jPlayer("play");
      },
      swfPath: "/js",
      supplied: "mp3, oga"
  });

  $("#dsp_floresta").jPlayer({
      ready: function(event) {
          $(this).jPlayer("setMedia", {
              mp3: "audio/floresta_ode.mp3"
          });
      },
      ended: function() { // The $.jPlayer.event.ended event
      },
      swfPath: "/js",
      supplied: "mp3, oga"
  });


  $(window).scroll(function(){
    if ($(window).scrollTop() == 0){
      $("#dsp_toada").jPlayer("stop");
        $("#dsp_floresta").jPlayer("stop");
      }
    if ($(window).scrollTop() < 10){
        $("#intro_setas").fadeIn(300).fadeOut(300).fadeIn(300).fadeIn(400).fadeOut(500).fadeIn(300);
    }
    if ($(window).scrollTop() > 10){
      $("#dsp_toada").jPlayer("play");
    }
    if ($(window).scrollTop() > 2000){
        $("#dsp_floresta").jPlayer("play");
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