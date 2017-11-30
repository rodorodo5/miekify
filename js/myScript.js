  
var cont = 1;
var clicked = false;
var intervalo;


function spinner(c){
     intervalo = setInterval( function (){
            if (cont==5) {

                $('.textosvg' + cont).css({ fill: 'gray' });
                $('#f' + cont).css({ fill: 'white' });
                cont = 0;
                $('.textosvg' + cont).css({ fill: 'white' });
                $('#f' + cont).css({ fill: '#1456a0' });

                $('#circleImg').css({ fill: 'url(#image1)' });

            } //reset
         $('.textosvg' + cont).css({ fill: 'gray' });
         $('#f' + cont).css({ fill: 'white' });
         cont++; 
         $('.textosvg' + cont).css({ fill: 'white' });
         $('#f' + cont).css({ fill: '#1456a0' });

        var first = $(".monitores:first-of-type").remove();
        $(".monitores").parent().append(first);
        $('#circleImg').css({ fill: 'url(#image'+cont+')' });

    }, 3000); 

    
}

spinner(cont);

$(document).on("click","path,text",function() {
     clicked = true;
       if (clicked == true) {
        var element =  $('.monitores[data-link=' + $(this).attr('data-link') + ']').remove();
        $(".monitores").parent().prepend(element);
        clearInterval(intervalo);
        vaciarCircle();
        var pat =  ('.textosvg' + $(this).attr('data-link') + '');
        var txt =  ('#f' + $(this).attr('data-link') + '');
        var ico =  ('#image' + $(this).attr('data-link') + '');



        $(pat).css({ fill: 'white' });
        $(txt).css({ fill: '#1456a0' });
        $('#circleImg').css({ fill: 'url('+ico+')' });
    }

});

function vaciarCircle(){
    for (var i = 5; i >= 0; i--) {
            $('.textosvg' + i).css({ fill: 'gray' });
            $('#f' + i).css({ fill: 'white' });
        }
}




//para el footer aqui abajo

  $(document).ready(function() {
    var resizeTimer,
        $window = $(window);

    function imageresize()
    {
        if ($window.width() < 885)
        {
            
             $('.top_layer_footer').css('display','none');
             $('.top_layer_footer2').css('display','block');
             
        }
        else if ($window.width() > 885)
        {
            
            $('.top_layer_footer').css('display','block');
            $('.top_layer_footer2').css('display','none');
             
        }
    }
    imageresize();

    $window.resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(imageresize, 100);
    });

  }); 

  




