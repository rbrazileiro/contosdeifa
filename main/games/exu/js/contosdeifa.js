$( document ).ready(function() {
	// Skrollr
	var s = skrollr.init({
        forceHeight: true,
         constants: {
            exu: 100,
            exus: 1000
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
    
	// Trilha Sonora

    $("#dsp_toada").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                mp3: "audio/toada_exu.mp3"
            });
        },
        ended: function() { // The $.jPlayer.event.ended event
            $(this).jPlayer("play");
        },
        swfPath: "/js",
        supplied: "mp3, oga"
    });

    $("#dsp_mar").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                mp3: "audio/mar.mp3"
            });
        },
        ended: function() { // The $.jPlayer.event.ended event
        },
        swfPath: "/js",
        supplied: "mp3, oga"
    });
    $("#dsp_trovao").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                mp3: "audio/trovaocomaguastereo.mp3"
            });
        },
        ended: function() { // The $.jPlayer.event.ended event

        },
        swfPath: "/js",
        supplied: "mp3, oga"
    });

	// Big Bang using Particles.js

	$(window).scroll(function(){
		if ($(window).scrollTop() == 0){
			$("#dsp_toada").jPlayer("stop");
            $("#dsp_mar").jPlayer("stop");
            $("#dsp_trovao").jPlayer("stop");

            // bigbang.stop();
        }
        if ($(window).scrollTop() < 10){
            $("#intro_setas").fadeIn(300).fadeOut(300).fadeIn(300).fadeIn(400).fadeOut(500).fadeIn(300);
        }
        if ($(window).scrollTop() > 10){
        	$("#dsp_toada").jPlayer("play");
        }
        if ($(window).scrollTop() > 10000){
            $("#dsp_mar").jPlayer("play");
        }
        if ($(window).scrollTop() > 12000){
            $("#dsp_trovao").jPlayer("play");
        }



        // Stops skrollr
        // if ($(window).scrollTop() > 48200){
        //     $('body').css({'overflow':'hidden'});
        // }



    });

	// var bigbang = new particle_emitter({
 //    	image: ['imgs/intro/dende.png'],
 //    	center: ['50%', '60%'], offset: [0, 0], radius: 0,
 //    	size: 36, velocity: 500, decay: 5000, rate: 100
 //    });

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