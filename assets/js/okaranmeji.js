// Contos de Ifá
// Mini-game Okaran Mèjí
// 3Ecologias.net e Coco de Umbigada

$( document ).ready(function() {

        var miss = 0;
        var hit = 0;

        var play;
        var sec;

        $("#btnstart").click(function(){
            startplay();
            $("html, body").animate({ scrollTop: $(document).height() }, 10);
            $('body').css({'overflow':'hidden'});
        });

        function startplay() {
            $("#exu_message").fadeOut('slow');
            $(".character").fadeOut('slow');
            $("#miss").html("0 Ovos");
            $("#hit").html("0 Dendes");
            miss = 0;
            hit = 0;
            $("#btnstart").css("color", "#e3e3e3");
            $("#btnstart").unbind("click");
            $('body').css( 'cursor', 'url(../imgs/exu/mao.gif), pointer' );
            play = setInterval(scramble, 1800);
            sec = 58;
            var timer = setInterval(function() { 
                $('#timer').html(sec--);
                    if (sec == -1) {
                        $('#timer').fadeOut('fast');
                        clearInterval(timer);
                } 
            }, 1000);

            setTimeout(function() {
                clearInterval(play);
                $("#btnstart").css("color", "#333333");
                $("#btnstart").bind("click", startplay);

                // show the final message
                var containerPos = $('#exu_container').offset();
                $("#exu_message").fadeIn('slow');
                clearInterval(timer);
                // $("#exu_message").animate({
                //     top: containerPos.top,
                //     left: containerPos.left
                //     }, 'fast', function() {
                //         setTimeout(function() {
                //             $("#exu_message").fadeIn('slow');
                //             // $(".character").fadeIn('slow');
                //         }, 500);
                // });
            }, 60000);
        }

        $(".character").click(function() {
            if ($(this).hasClass("ovo")) {
                $(this).effect("bounce", {
                    times: 2,
                    direction: 'left'
                }, 300);
                $(this).slideUp("fast");
                miss++;
                hit--;
                $("#hit").html(hit + " Dendes");
                // $("#miss").html(miss + " Ovos");
            } else {
                $(this).effect("explode", 500);
                hit++;
                $("#hit").html(hit + " Dendes");
                if (hit == 16) {
                    $("#exu_dende").fadeIn(1000);
                    $("#exu_social").fadeIn(1000);
                    $("#exu_continuar").fadeIn(1000);
                    $(".character").fadeOut('slow');
                    $("#exu_message").css("z-index", "1");
                    clearInterval(play);
                    $("#btnstart").css("color", "#333333");
                    $("#btnstart").bind("click", startplay);
                    // $('body').css({'overflow':'visible'});
                    $("#exu_stat").fadeOut('slow');
                    $("#exu_stat").css("z-index", "1");
                    // $("#esu").animate({
                    //     'background-position-x': '10%',
                    //     'background-position-y': '20%'
                    // }, 10000, 'linear');
                    // $("#esu").css("z-index", "28");
                    $('body').css( 'cursor', 'pointer' );
                }
            }
            
        });
    });

    function randomFromTo(from, to){
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function scramble() {
        var children = $('#exu_container').children();

        var randomId = randomFromTo(1, children.length);
        moveRandom('char'+randomId);
        setTimeout(function(){
            $("#char"+randomId).slideDown('fast');            
        }, 500);
        
        setTimeout(function() {
            $("#char"+randomId).slideUp('fast');
        }, 1500);
    }

    function moveRandom(id) {
        /* get container position and size
         * -- access method : cPos.top and cPos.left */
        var cPos = $('#exu_container').offset();
        var cHeight = $('#exu_container').height();
        var cWidth = $('#exu_container').width();

        // get box padding (assume all padding have same value)
        var pad = parseInt($('#exu_container').css('padding-top').replace('px', ''));

        // get movable box size
        var bHeight = $('#'+id).height();
        var bWidth = $('#'+id).width();

        // set maximum position
        maxY = cPos.top + cHeight - bHeight - pad;
        maxX = cPos.left + cWidth - bWidth - pad;

        // set minimum position
        minY = cPos.top + pad;
        minX = cPos.left + pad;

        // set new position
        newY = randomFromTo(minY, maxY);
        newX = randomFromTo(minX, maxX);

        $('#'+id).animate({
            top: newY,
            left: newX
            }, 'slow', function() {
        });
}