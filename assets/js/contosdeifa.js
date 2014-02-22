$( document ).ready(function() {
	// Skrollr
	var s = skrollr.init({forceHeight: true});

	// Trilha Sonora

    $("#dsp_machado").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                mp3: "audio/intro/machado.mp3"
            });
        },
        ended: function() { // The $.jPlayer.event.ended event
        },
        swfPath: "/js",
        supplied: "mp3, oga"
    });

    $("#dsp_metal").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                mp3: "audio/intro/metal.mp3"
            });
        },
        ended: function() { // The $.jPlayer.event.ended event
        },
        swfPath: "/js",
        supplied: "mp3, oga"
    });
    $("#dsp_cocos").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                mp3: "audio/intro/cocos.mp3"
            });
        },
        ended: function() { // The $.jPlayer.event.ended event

        },
        swfPath: "/js",
        supplied: "mp3, oga"
    });
    $("#dsp_raiz").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                mp3: "audio/intro/raiz.mp3"
            });
        },
        ended: function() { // The $.jPlayer.event.ended event

        },
        swfPath: "/js",
        supplied: "mp3, oga"
    });
    $("#dsp_obami").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                mp3: "audio/intro/obami.mp3"
            });
        },
        ended: function() { // The $.jPlayer.event.ended event
        	$(this).jPlayer("play");

        },
        swfPath: "/js",
        supplied: "mp3, oga"
    });
    $("#dsp_exu").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                mp3: "audio/exu/toqueexu.mp3"
            });
        },
        ended: function() { // The $.jPlayer.event.ended event
            $(this).jPlayer("play");

        },
        swfPath: "/js",
        supplied: "mp3, oga"
    });

	// Big Bang using Particles.js

	$(window).scroll(function(){
		if ($(window).scrollTop() == 0){
			$("#dsp_cocos").jPlayer("stop");
			$("#dsp_machado").jPlayer("stop");
            bigbang.stop();
        }

        if ($(window).scrollTop() > 10){
        	$("#dsp_machado").jPlayer("play");
        }

        if ($(window).scrollTop() > 50){
        	$("#dsp_metal").jPlayer("play");
        	$("#dsp_cocos").jPlayer("play");
            bigbang.start();
        }
        if ($(window).scrollTop() > 250){
        	$("#dsp_machado").jPlayer("stop");
        	$("#dsp_metal").jPlayer("stop");
        	$("#dsp_cocos").jPlayer("stop");
            bigbang.stop();
        }

		if ($(window).scrollTop() > 300){
			$("#dsp_obami").jPlayer("volume", 0.0001);
        	$("#dsp_obami").jPlayer("play");
        }

        if ($(window).scrollTop() > 400){
			$("#dsp_obami").jPlayer("volume", 0.001);
        }

        if ($(window).scrollTop() > 500){
			$("#dsp_obami").jPlayer("volume", 0.01);
        }

        if ($(window).scrollTop() > 700){
			$("#dsp_obami").jPlayer("volume", 0.1);
        }

        if ($(window).scrollTop() > 1000){
			$("#dsp_obami").jPlayer("volume", 0.4);
        }

        if ($(window).scrollTop() > 3000){
			$("#dsp_obami").jPlayer("volume", 0.8);
        }        

        if ($(window).scrollTop() > 4000){
        	$("#dsp_raiz").jPlayer("play");
        }
        if ($(window).scrollTop() > 4500){
        	$("#dsp_raiz").jPlayer("stop");
        }

        if ($(window).scrollTop() > 10000){
            $("#dsp_obami").jPlayer("volume", 0.4);
        }
        if ($(window).scrollTop() > 11000){
            $("#dsp_obami").jPlayer("volume", 0.2);
        }
        if ($(window).scrollTop() > 12000){
            $("#dsp_obami").jPlayer("volume", 0.1);
        }
        if ($(window).scrollTop() > 12100){
            $("#dsp_exu").jPlayer("play");
        }
        if ($(window).scrollTop() > 13000){
            $("#dsp_obami").jPlayer("volume", 0.05);
        }
        if ($(window).scrollTop() > 13000){
            $("#dsp_exu").jPlayer("volume", 0.8);
        }
        if ($(window).scrollTop() > 15000){
            $("#dsp_obami").jPlayer("stop");
        }



        // Stops skrollr
        // if ($(window).scrollTop() > 48200){
        //     $('body').css({'overflow':'hidden'});
        // }



    });

	var bigbang = new particle_emitter({
    	image: ['imgs/intro/dende.png'],
    	center: ['50%', '60%'], offset: [0, 0], radius: 0,
    	size: 36, velocity: 500, decay: 5000, rate: 100
    });




});