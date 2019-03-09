var bg_image_num = getRandomInt(1, 4);
document.body.style.backgroundImage = 'url("/img/bg/'+bg_image_num+'.jpg")';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}