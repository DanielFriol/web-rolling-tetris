var playing = false;
var width;
var height;
var matrix;
var pieces = [
    [
        [],
        [],
        []
    ],
    [
        [],
        [],
        []
    ],
    [
        [],
        [],
        []
    ],
    [
        [],
        [],
        []
    ],
    [
        [],
        [],
        []
    ],
    [
        [],
        [],
        []
    ],
    [
        [],
        [],
        []
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
