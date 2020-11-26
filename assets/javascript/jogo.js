
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
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
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


const colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'grey',
    'purple',
    'brown'
]

const PS = 20;

var timeInterval;

function play() {
    playing = true;

    var size = document.getElementById('game-size').value;
    var sizeArr = size.split('x');
    width = parseInt(sizeArr[0]);
    height = parseInt(sizeArr[1]);

    var canvas = document.getElementById('game');
    canvas.width = width * PS;
    canvas.height = height * PS;

    var tetris = document.getElementById('tetris');
    tetris.style.height = height * PS;

    emptyMatrix();
    console.table(matrix);

    var canvasContext = canvas.getContext("2d");

    for (x = 0; x < height; x++) {
        for (y = 0; y < width; y++) {
            canvasContext.fillStyle = 'white';
            canvasContext.fillRect(y * PS, x * PS, PS, PS);
            canvasContext.fillStyle = 'black';
            canvasContext.strokeRect(y * PS, x * PS, PS, PS);
        }
    }

    timer();

    var pieceRandom = Math.floor(Math.random() * 7);
    var initialPosX;
    if(width == 22)
        initialPosX = 9;
    else
        initialPosX = 3;

    drawPiece(pieces[pieceRandom], colors[pieceRandom], initialPosX, 0);

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

function drawPiece(piece, color, x, y) {
    var canvas = document.getElementById("game");
    var canvasContext = canvas.getContext("2d");

    for (a = 0; a < piece.length; a++) {
        for (b = 0; b < piece.length; b++) {
            if (piece[b][a]) {
                canvasContext.fillStyle = color;
                canvasContext.fillRect((a * PS) + (PS * x), (b * PS) + (PS * y), PS, PS);
                canvasContext.fillStyle = 'black';
                canvasContext.strokeRect((a * PS) + (PS * x), (b * PS) + (PS * y), PS, PS);
            }
        }
    }
}
