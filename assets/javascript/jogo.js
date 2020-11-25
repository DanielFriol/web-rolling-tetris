var playing = false;
var width;
var height;
var matrix;
var moveX;
var moveY;

function play() {
    playing = true;

    var size = document.getElementById('game-size').value;
    var sizeArr = size.split('x');
    width = sizeArr[0];
    height = sizeArr[1];

    var canvas = document.getElementById('game');
    canvas.style.width = width * 30 + 'px';
    canvas.style.height = height * 30 + 'px';

    var tetris = document.getElementById('tetris');
    tetris.style.height = height * 30 + 'px';

    emptyMatrix();
    console.table(matrix);

    document.getElementById('play').style.display = 'none';
    document.getElementById('stop').style.display = 'initial';
}

function stop() {
    playing = false;
    document.getElementById('play').style.display = 'initial';
    document.getElementById('stop').style.display = 'none';
}

function emptyMatrix() {
    matrix = [];
    for (var i = 0; i < height; i++) {
        matrix[i] = [];
        for (var j = 0; j < width; j++) {
            matrix[i][j] = 0;
        }
    }
}