var bg_image_num = getRandomInt(1, 4);
document.body.style.backgroundImage = 'url("css/bg/'+bg_image_num+'.jpg")';
document.body.style.backgroundSize = "100% 100%";

//change height of the html and body
//var header_height = document.getElementById('main-header').innerHeight;
//document.body.style.height = document.body.style.height - header_height + 'px';
//document.body.style.height = document.body.style.height - header_height + 'px';

//console.log(document.body.style.height+"-"+header_height);

$(document).ready(function() {
    var header_height = $('#main-header').height();
    //var html_height = $('html').height();
    var body_height = $('body').height();
    //$('html').css("height", (html_height-header_height)+"px");
    $('body').css("height", (body_height-header_height)+"px");
});


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}