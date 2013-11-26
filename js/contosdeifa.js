$( document ).ready(function() {
 	// 	$('body').starscroll(
	//     16,
	//     3,
	//     10,
	//     5,
	//     5,
	//     [193,198,150],
	//     false,
	//     true
	// ); 

	// $('.ifa').parallax({
	// 	calibrateX: false,
	// 	calibrateY: true,
	// 	invertX: false,
	// 	invertY: true,
	// 	limitX: false,
	// 	limitY: 10,
	// 	scalarX: 2,
	// 	scalarY: 8,
	// 	frictionX: 0.2,
	// 	frictionY: 0.8
	// });

	// Skrollr Libs
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