$(document).ready(function () {
    $("body").queryLoader2({
        barColor: "#fff",
        backgroundColor: "#59c852",
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