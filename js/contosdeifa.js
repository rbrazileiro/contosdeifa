$( document ).ready(function() {
	// Skrollr
	var s = skrollr.init();

	// Big Bang using Particles.js

	$(window).scroll(function(){
		if ($(window).scrollTop() == 0){
            bigbang.stop();
        }

        if ($(window).scrollTop() > 50){
            bigbang.start();
        }
        if ($(window).scrollTop() > 250){
            bigbang.stop();
        }
    });

	var bigbang = new particle_emitter({
    	image: ['imgs/intro/dende.png'],
    	center: ['50%', '50%'], offset: [0, 0], radius: 0,
    	size: 36, velocity: 500, decay: 3000, rate: 70
    });



	





});