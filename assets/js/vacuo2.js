$(document).ready(function () {
    $("body").queryLoader2({
        barColor: "#6e6d73",
        backgroundColor: "#2000b9",
        percentage: true,
        barHeight: 1,
        completeAnimation: "grow",
        minimumTime: 100,
        onComplete: function() {initSkrollr();}
    });
});