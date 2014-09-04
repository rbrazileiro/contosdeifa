$( document ).ready(function() {
	// Skrollr
	var s = skrollr.init({
        forceHeight: true,
         constants: {
            exu: 100,
            exus: 1000
        }
    });

    $("#intro_setas").each(function () {
        var hovered = false;
        var loop = window.setInterval(function () {
            if (hovered) {
                var steps = $(document).scrollTop();
                steps+=200;
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

    $("#dsp_abertura").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                mp3: "audio/abertura.mp3"
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
                mp3: "audio/cocos.mp3"
            });
        },
        ended: function() { // The $.jPlayer.event.ended event

        },
        swfPath: "/js",
        supplied: "mp3, oga"
    });

	$(window).scroll(function(){
		if ($(window).scrollTop() > 0){
			$("#dsp_abertura").jPlayer("play");
			$("#dsp_toque").jPlayer("stop");

            // bigbang.stop();
        }
        if ($(window).scrollTop() < 10){
            $("#intro_setas").fadeIn(2000).fadeOut(500).fadeIn(1000).fadeOut(500).fadeIn(1000);
        }
        if ($(window).scrollTop() < 10){
			$("#dsp_abertura").jPlayer("volume", 0.5);
        }

        if ($(window).scrollTop() > 20){
			$("#dsp_abertura").jPlayer("volume", 0.6);
        }

        if ($(window).scrollTop() > 50){
			$("#dsp_abertura").jPlayer("volume", 0.7);
        }

        if ($(window).scrollTop() > 100){
			$("#dsp_abertura").jPlayer("volume", 0.9);
        }      

    });

    $( ".portfolio-item" ).mouseenter(function() {
        $("#dsp_cocos").jPlayer("play");
    });

    $('.portfolio-item').hover(function() {
        $(this).animate({"color":"#FBCD06","font-size":"2em"}, 1000);
    }, function() {
        $(this).animate({"color":"#FFF","font-size":"1em"}, 1000);
    });
});