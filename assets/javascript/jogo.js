var playing = false;

function play() {
    playing = true;
    document.getElementById('play').style.display = 'none';
    document.getElementById('stop').style.display = 'initial';
}

function stop() {
    playing = false;
    document.getElementById('play').style.display = 'initial';
    document.getElementById('stop').style.display = 'none';
}