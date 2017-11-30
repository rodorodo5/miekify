$(document).ready(function() {
    var resizeTimer,
        $window = $(window);

    function imageresize() {
        if ($window.width() < 885) {

            $('.top_layer_footer').css('display', 'none');
            $('.top_layer_footer2').css('display', 'block');

        } else if ($window.width() > 885) {

            $('.top_layer_footer').css('display', 'block');
            $('.top_layer_footer2').css('display', 'none');

        }
    }
    imageresize();

    $window.resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(imageresize, 100);
    });

});