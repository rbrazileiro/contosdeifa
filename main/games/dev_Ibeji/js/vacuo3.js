$(document).ready(function () {
    $("body").queryLoader2({
        barColor: "#000",
        backgroundColor: "#007900",
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