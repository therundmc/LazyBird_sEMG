

function isCollision(object1, object2)
{
    if ((object1.x < object2.x + object2.width) && 
        (object1.x + object1.width > object2.x) &&
        (object1.y < object2.y + object2.height) && 
        (object1.y + object1.height > object2.y)) {
            return true;
    }
    return false;
}

function playSound(sound, volume) {
    if (!sound.isPlaying() && soundOn) {
        sound.setVolume(volume);
        sound.play();
    }
}

function stopSound(sound) {
    if (sound.isPlaying()) {
        sound.stop();
    }
}

function forcePlaySound(sound, volume) {
    if (soundOn) {
        sound.setVolume(volume);
        sound.play();
    }
}

function deInit() {
    // Background
    mapList = [];

    // Pipes
    pipesList = [];

    // Lazy
    lazyList = [];

     // Bad Lazy
    robotyList = [];
    lazyKazeList = [];

    for (i=0; i< SOUND_LIST.COUNT; i++) {
        soundList[i].stop();
    } 
}

function breath() {
    return (128 + 128 * sin(millis() / 1000));
}

function computeAverage(value, averageValue) {
    averageValue = Math.round(((averageValue * 20) + value) / 21)
    if (averageValue <= 0) {
        averageValue = 0;
    }
    else if (averageValue > 1024) {
        averageValue = 1024;
    }
    return averageValue;
}

function startTimer() {
    timer = millis();
}


function getTimer() {
    return millis() - timer;
}

function getTimeout(timeout) {
    let now = millis();

    if(now-timer > timeout) {
        return true
    }
    else {
        return false
    }

}

function rotate_and_draw_image(img, img_x, img_y, img_width, img_height, img_angle){
    imageMode(CENTER);
    translate(img_x+img_width/2, img_y+img_width/2);
    rotate(PI/180*img_angle);
    image(img, 0, 0, img_width, img_height);
    rotate(-PI / 180 * img_angle);
    translate(-(img_x+img_width/2), -(img_y+img_width/2));
    imageMode(CORNER);
  }