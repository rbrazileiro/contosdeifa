$(document).ready(function () {
    $("body").queryLoader2({
        barColor: "#8DFF00",
        backgroundColor: "#8DAA00",
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