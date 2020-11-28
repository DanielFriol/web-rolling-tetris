var playing = false;
var width;
var height;
var matrix;

const pieces = [
    [
        //   peça 1 - funcionando
        [1, 0, 1],
        [1, 1, 1],
    ],
    [
        //   peça 2 - funcionando
        [1, 1],
        [1, 1],
    ],
    [
        //   peça 3 - funcionando
        [1],
    ],
    [
        //   peça 4 - funcionando
        [0, 1, 0],
        [1, 1, 1],
    ],
    [
        //   peça 5 - funcionando
        [0, 1],
        [0, 1],
        [1, 1],
    ],
    [
        //   peça 6  - funcionando
        [1, 0],
        [1, 0],
        [1, 1],
    ],
    [
        //   peça 7 - funcionando
        [1, 1, 1, 1],
    ],
];

const colors = ["red", "blue", "green", "yellow", "grey", "purple", "brown"];

var CurrentPiece;
const PS = 20;
var pieceInterval;
var timeInterval;
var gameSpeed = 1000;
let eventListener;

addEventListener("keydown", (x) => movePiece(x));

function play() {
    playing = true;

    var size = document.getElementById("game-size").value;
    var sizeArr = size.split("x");
    width = parseInt(sizeArr[0]);
    height = parseInt(sizeArr[1]);

    var canvas = document.getElementById("game");
    canvas.width = width * PS;
    canvas.height = height * PS;

    var tetris = document.getElementById("tetris");
    tetris.style.height = height * PS;

    emptyMatrix();

    var canvasContext = canvas.getContext("2d");

    for (x = 0; x < height; x++) {
        for (y = 0; y < width; y++) {
            canvasContext.fillStyle = "white";
            canvasContext.fillRect(y * PS, x * PS, PS, PS);
            canvasContext.fillStyle = "black";
            canvasContext.strokeRect(y * PS, x * PS, PS, PS);
        }
    }

    timer();

    generateNewPiece();

    pieceInterval = setInterval(() => {
        // console.log("tic");
        if (
            verifyBoundries(
                CurrentPiece.x,
                CurrentPiece.y + CurrentPiece.piece.length, // Antes estava medindo somente peças quadras, assim funciona de maneira humana
                CurrentPiece.piece.length
            )
        ) {
            //   console.log("tac");

            undrawPiece(CurrentPiece.piece, CurrentPiece.x, CurrentPiece.y);
            CurrentPiece.y++;
            drawPiece(
                CurrentPiece.piece,
                CurrentPiece.color,
                CurrentPiece.x,
                CurrentPiece.y
            );
        }
        if (verifyCollision(CurrentPiece,  CurrentPiece.x,
            CurrentPiece.y + CurrentPiece.piece.length)) {
            generateNewPiece();
        }
    }, gameSpeed);

    document.getElementById("play").style.display = "none";
    document.getElementById("stop").style.display = "initial";
}

function generateNewPiece() {
    var pieceRandom = Math.floor(Math.random() * 7);

    var initPos = Math.floor(width / 2 - pieces[pieceRandom][0].length / 2);

    //   console.log(width / 2 - pieces[pieceRandom][0].length / 2);

    CurrentPiece = {
        piece: pieces[pieceRandom],
        color: colors[pieceRandom],
        x: initPos,
        y: 0,
    };
    console.log(CurrentPiece);
    drawPiece(
        CurrentPiece.piece,
        CurrentPiece.color,
        CurrentPiece.x,
        CurrentPiece.y
    );
}

function movePiece(event) {
    if (playing) {
        if (event.key == "ArrowLeft") {
            console.log("left");
            if (
                !verifyBoundries(
                    CurrentPiece.x - 1,
                    CurrentPiece.y,
                    CurrentPiece.piece.length
                )
            )
                return;
            undrawPiece(CurrentPiece.piece, CurrentPiece.x, CurrentPiece.y);
            CurrentPiece.x--;
            drawPiece(
                CurrentPiece.piece,
                CurrentPiece.color,
                CurrentPiece.x,
                CurrentPiece.y
            );
        } else if (event.key == "ArrowRight") {
            console.log("right");
            if (
                !verifyBoundries(
                    CurrentPiece.x + CurrentPiece.piece[0].length, // Antes estava medindo somente peças quadras, assim funciona de maneira humana
                    CurrentPiece.y,
                    CurrentPiece.piece.length
                )
            )
                return;
            undrawPiece(CurrentPiece.piece, CurrentPiece.x, CurrentPiece.y);
            CurrentPiece.x++;
            drawPiece(
                CurrentPiece.piece,
                CurrentPiece.color,
                CurrentPiece.x,
                CurrentPiece.y
            );
        } else if (event.key == "ArrowDown") {
            console.log("down");
            if (
                !verifyBoundries(
                    CurrentPiece.x,
                    CurrentPiece.y + CurrentPiece.piece.length, // Antes estava medindo somente peças quadras, assim funciona de maneira humana
                    CurrentPiece.piece.length
                )
            )
                return;
            undrawPiece(CurrentPiece.piece, CurrentPiece.x, CurrentPiece.y);
            CurrentPiece.y++;
            drawPiece(
                CurrentPiece.piece,
                CurrentPiece.color,
                CurrentPiece.x,
                CurrentPiece.y
            );
            if (verifyCollision(CurrentPiece,  CurrentPiece.x,
                CurrentPiece.y + CurrentPiece.piece.length)) {
                generateNewPiece();
            }
        } else if (event.key = "ArrowUp") {
            console.log("up");
            undrawPiece(CurrentPiece.piece, CurrentPiece.x, CurrentPiece.y);
            CurrentPiece.piece = rotate(CurrentPiece.piece);
            drawPiece(
                CurrentPiece.piece,
                CurrentPiece.color,
                CurrentPiece.x,
                CurrentPiece.y
            );
            if (verifyCollision(CurrentPiece, CurrentPiece.x,
                CurrentPiece.y + CurrentPiece.piece.length)) {
                generateNewPiece();
            }
        }
    }
}

function verifyCollision(currentPiece, x, y) {
    if ((currentPiece.y + currentPiece.piece.length > height - 1) || (matrix[y][x] === 1)) {
        return true;
    }
}

function stop() {
    playing = false;

    emptyMatrix();
    clearInterval(timeInterval);
    clearInterval(pieceInterval);
    removeEventListener("keydown", movePiece, false);
    document.getElementById("tempo").innerHTML = 0 + "m" + ":" + 0 + "s";

    document.getElementById("play").style.display = "initial";
    document.getElementById("stop").style.display = "none";
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
        if (segundos > 59) {
            /*Se segundos forem maiores que 59*/
            segundos = 0; /*Zera os segundos*/
            minutos++; /*e Incrementa os minutos*/
        }
        document.getElementById("tempo").innerHTML =
            minutos + "m" + ":" + segundos + "s";
    }, 1000);
}

function undrawPiece(piece, x, y) {
    var canvas = document.getElementById("game");
    var canvasContext = canvas.getContext("2d");

    for (a = 0; a < piece[0].length; a++) {
        // Antes estava medindo somente peças quadras, assim funciona de maneira humana
        // console.log("a ", a);
        for (b = 0; b < piece.length; b++) {
            //   console.log("b ", b);
            if (piece[b][a]) {
                // console.log("undraw");
                canvasContext.fillStyle = "white";
                canvasContext.fillRect(a * PS + PS * x, b * PS + PS * y, PS, PS);
                canvasContext.fillStyle = "black";
                canvasContext.strokeRect(a * PS + PS * x, b * PS + PS * y, PS, PS);
                matrix[y + b][x + a] = 0;
            }
        }
    }
}

function verifyBoundries(x, y) {
    if (
        // matrix[y + (height - 1)][x + (size - 1)] != undefined && // Não precisa disso pq vcs estavam medindo somente peças quadradas
        matrix[y][x] === 0
    ) {
        return true;
    } else return false;
}

function drawPiece(piece, color, x, y) {
    var canvas = document.getElementById("game");
    var canvasContext = canvas.getContext("2d");

    for (a = 0; a < piece[0].length; a++) {
        // Antes estava medindo somente peças quadras, assim funciona de maneira humana
        // console.log("a ", a);
        for (b = 0; b < piece.length; b++) {
            //   console.log("b ", b);
            if (piece[b][a]) {
                canvasContext.fillStyle = color;
                canvasContext.fillRect(a * PS + PS * x, b * PS + PS * y, PS, PS);
                canvasContext.fillStyle = "black";
                canvasContext.strokeRect(a * PS + PS * x, b * PS + PS * y, PS, PS);
                matrix[y + b][x + a] = 1;
            }
        }
    }
}


function rotate(piece) {
    var pieceAux = piece.slice();
    pieceAux.reverse();
    var newPiece = [];
    for (x = 0; x < pieceAux[0].length; x++) {
        newPiece[x] = [];
        for (y = 0; y < pieceAux.length; y++) {
            newPiece[x][y] = pieceAux[y][x]
        }
    }
    return newPiece;
}
