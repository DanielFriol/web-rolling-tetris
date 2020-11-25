var playing = false;
var width;
var height;
var matrix;
var pieces = [
    [
        [0, 0, 0],
        [1, 0, 1],
        [1, 1, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [1, 1, 0]
    ],
    [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1]
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 1]
    ],
    [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0]
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
];
var timeInterval;

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

    timer();

    drawPiece();

    document.getElementById('play').style.display = 'none';
    document.getElementById('stop').style.display = 'initial';
}

function stop() {
    playing = false;

    emptyMatrix();
    clearInterval(timeInterval);
    document.getElementById("tempo").innerHTML = 0 + "m" + ":" + 0 + "s";

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
function timer() {
    var segundos = 0;
    var minutos = 0;

    timeInterval = setInterval(function () {
        segundos++;
        if (segundos > 59) { /*Se segundos forem maiores que 59*/
            segundos = 0; /*Zera os segundos*/
            minutos++; /*e Incrementa os minutos*/
        }
        document.getElementById("tempo").innerHTML = minutos + "m" + ":" + segundos + "s";
    }, 1000);
}

function drawPiece() {
    var canvas = document.getElementById('game');
    canvas.getContext('2d').fillStyle = 'blue';
    var piece = pieces[0];
    piece.forEach((x, y) => {
        x.forEach((z, a) => {
            if (z > 0) {
                canvas.getContext('2d').fillRect(3 + z, 0 + y, 1, 1);
            }
        });
    });
}
