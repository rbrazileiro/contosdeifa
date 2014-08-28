$(document).ready(function () {
    $("body").queryLoader2({
        barColor: "#6e6d73",
        backgroundColor: "#2000b9",
        percentage: false,
        barHeight: 10,
        completeAnimation: "grow",
        minimumTime: 100,
        onLoadComplete: hidePreLoader
    });
    function hidePreLoader() {
        $("#preloader").hide();
    }
});