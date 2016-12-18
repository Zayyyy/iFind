/**
 * Created by zayy on 2016/8/12.
 */
$(function(){
    $('#title').addClass('animated bounceIn');
    $('#title2').addClass('animated fadeOut');
    $('#title3').addClass('animated fadeOut');
    $('.sub-text').addClass('animated fadeInUp');
    Circle();
});
function Circle(){
    setTimeout(function(){
        $('#background1').addClass('animated fadeOut');
    }, 5000);
    setTimeout(function(){
        $('.sub-text').addClass('animated fadeOut');
        $('.sub-text').removeClass('fadeInUp');
        $('#title').addClass('animated fadeOut');
        $('#title2').removeClass('animated fadeOut');
        $('#title2').addClass('animated flipInX');
    }, 6000);
    setTimeout(function(){
        $('#background2').addClass('animated fadeOut');
    }, 11000);
    setTimeout(function(){
        $('#title2').addClass('animated fadeOut');
        $('#title2').removeClass('flipInX');
        $('#title3').removeClass('animated fadeOut');
        $('#title3').addClass('animated fadeInUp');
    }, 12000);
    setTimeout(function(){
        $('#background3').addClass('animated fadeOut');
        $('#title3').addClass('animated fadeOut');
        $('#background1').removeClass('animated fadeOut');
        $('#background1').addClass('animated fadeIn');
    }, 17000);
    setTimeout(function(){
        $('#title').removeClass('animated fadeOut');
        $('#title').addClass('animated bounceIn');
        $('#background2').removeClass('animated fadeOut');
        $('#background2').addClass('animated fadeIn');
        $('#background3').removeClass('animated fadeOut');
        $('#background3').addClass('animated fadeIn');
    }, 18000);

    setTimeout(function(){
        $('.sub-text').removeClass('animated fadeOut');
        $('.sub-text').addClass('animated fadeInUp');
    }, 18000);
    setTimeout('Circle()',17000);
}