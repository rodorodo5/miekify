
$(document).mouseup(function(e) {
$(".primerBut").click(function() {
    $('.segundoBut').show();
    $('.primerBut').hide();
    $('#animatedModal').animate({ marginTop: '0px' }, 200);

});
$(".segundoBut").click(function() {
    $('#animatedModal').animate({ marginTop: '-600px' }, 200);
    $('.primerBut').show();
    $('.segundoBut').hide();

});
    var container = $("#animatedModal");
    var $window = $(window);

    if ($window.width() < 995) {
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.animate({ marginTop: '-600px' }, 200);
            $('.primerBut').show();
            $('.segundoBut').hide();
        }
    } else {

    }
});