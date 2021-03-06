var playing = false;
var width;
var height;
var matrix;

const pieces = [
  [
    //   peça 1 - bugado
    [9, 0, 9],
    [9, 9, 9],
  ],
  [
    //   peça 2 - funcionando
    [9, 9],
    [9, 9],
  ],
  [
    //   peça 3 - funcionando
    [9],
  ],
  [
    //   peça 4 - funcionando
    [9, 9, 9],
    [0, 9, 0],
  ],
  [
    //   peça 5 - funcionando
    [0, 9],
    [0, 9],
    [9, 9],
  ],
  [
    //   peça 6  - funcionando
    [9, 0],
    [9, 0],
    [9, 9],
  ],
  [
    //   peça 7 - funcionando
    [9, 9, 9, 9],
  ],
];

const colors = ["green", "blue", "red", "yellow", "grey", "purple", "brown"];

var CurrentPiece;
const PS = 20;
var pieceInterval;
var timeInterval;
var gameSpeed = 1000;
let eventListener;
var score = 0;
var linesCompleted = 0;
var cont = 2;
var canvasIverted = false;
let lastY = 0;
var level = 1;
var gameTime = 0;
var plays = [];
var playerName = null;

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
  gameSpeed = 1000;
  score = 0;
  if (canvasIverted) {
    rolling();
    canvasIverted = false;
  }

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
  // console.log("x: ", CurrentPiece.x);
  pieceInterval = setInterval(() => {
    lastY = CurrentPiece.y;
    if (
      verifyBoundriesDownFoda(
        CurrentPiece.piece,
        CurrentPiece.x,
        CurrentPiece.y + 1 // Antes estava medindo somente peças quadras, assim funciona de maneira humana
      )
    ) {
      // console.log(CurrentPiece.y + CurrentPiece.piece.length);
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
    if (
      !verifyBoundriesDownFoda(
        CurrentPiece.piece,
        CurrentPiece.x,
        CurrentPiece.y + 1
      )
    ) {
      verifyLines();
      generateNewPiece();
    }
    // console.log("y: ", CurrentPiece.y, " ly: ", lastY);
    if (CurrentPiece.y == lastY) {
      // Game Over
      alert("Game Over");
      // console.log("Stop");
      stop();
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
    idColor: pieceRandom,
  };
  // console.log(CurrentPiece);
  drawPiece(
    CurrentPiece.piece,
    CurrentPiece.color,
    CurrentPiece.x,
    CurrentPiece.y
  );
  // console.log("y: ", CurrentPiece.y);
}

function movePiece(event) {
  if (playing) {
    if (event.key == "ArrowLeft") {
      // console.log("left");
      if (
        !verifyBoundriesLeft(CurrentPiece.piece, CurrentPiece.x, CurrentPiece.y)
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
      // console.log("right");
      if (
        !verifyBoundriesRight(
          CurrentPiece.piece,
          CurrentPiece.x,
          CurrentPiece.y
        )
      )
        return;
      undrawPiece(CurrentPiece.piece, CurrentPiece.x, CurrentPiece.y);
      CurrentPiece.x++;
      // console.log("x: ", CurrentPiece.x);
      drawPiece(
        CurrentPiece.piece,
        CurrentPiece.color,
        CurrentPiece.x,
        CurrentPiece.y
      );
    } else if (event.key == "ArrowDown") {
      event.preventDefault();
      // console.log("down");
      if (
        !verifyBoundriesDownFoda(
          CurrentPiece.piece,
          CurrentPiece.x,
          CurrentPiece.y + 1
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
      if (
        !verifyBoundriesDownFoda(
          CurrentPiece.piece,
          CurrentPiece.x,
          CurrentPiece.y + 1
        )
      ) {
        verifyLines();
        generateNewPiece();
      }
    } else if ((event.key = "ArrowUp")) {
      event.preventDefault();
      // console.log("up");
      undrawPiece(CurrentPiece.piece, CurrentPiece.x, CurrentPiece.y);
      CurrentPiece.piece = rotate(CurrentPiece.piece);
      // let aux = CurrentPiece.x; //makakeagem que o daniel nao fez
      // CurrentPiece.x = CurrentPiece.y;
      // CurrentPiece.y = aux;
      drawPiece(
        CurrentPiece.piece,
        CurrentPiece.color,
        CurrentPiece.x,
        CurrentPiece.y
      );
      if (
        verifyCollision(
          CurrentPiece,
          CurrentPiece.x,
          CurrentPiece.y + CurrentPiece.piece.length
        )
      ) {
        verifyLines();
        generateNewPiece();
      }
    }
  }
}

function verifyCollision(currentPiece, x, y) {
  if (
    currentPiece.y + currentPiece.piece.length > height - 1 ||
    matrix[y][x] != 0
  ) {
    return true;
  }
}

function stop() {
  var http = new XMLHttpRequest();
  var url = "/web-rolling-tetris/server/saveGameResult.php";
  var gameHistory = new FormData();
  gameHistory.append("pointsAchieved", score);
  gameHistory.append("levelAchieved", level);
  gameHistory.append("durationTime", gameTime);
  http.open("POST", url, true);
  http.send(gameHistory);
  playing = false;
  emptyMatrix();
  clearInterval(timeInterval);
  clearInterval(pieceInterval);
  removeEventListener("keydown", movePiece, false);
  var table = document.getElementById("playsTable");
  var row = table.insertRow(1);
  var nameCell = row.insertCell(0);
  var pointsCell = row.insertCell(1);
  var levelCell = row.insertCell(2);
  var timeCell = row.insertCell(3);
  nameCell.innerHTML = playerName;
  pointsCell.innerHTML = score;
  levelCell.innerHTML = level;
  timeCell.innerHTML = secondsConverted(gameTime);
  gameTime = 0;
  score = 0;
  linesCompleted = 0;
  level = 1;
  document.getElementById("tempo").innerHTML = 0 + "m" + ":" + 0 + "s";
  document.getElementById("dificuldade").innerHTML = "--";
  document.getElementById("score").innerHTML = "0 Pontos";
  document.getElementById("linhas").innerHTML = "0 Linhas";

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
    gameTime++;
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
  if (matrix[y][x] === 0) {
    return true;
  } else return false;
}

function verifyBoundriesDownFoda(piece, x, y) {
  // console.log("y: ", y);
  // console.log("p.l: ", piece.length);
  // console.log("p[0].l: ", piece[0].length);
  // console.log("0 0: ", piece[0][0]);
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[0].length; j++) {
      // console.log("i ", i, " j ", j);
      if (i + 1 < piece.length) {
        if (piece[i][j] != 0 && piece[i + 1][j] != 9) {
          // console.log("x ", x + j, " y ", y + i, " piece: ", piece[i][j]);
          if (y + piece.length - 1 > height - 1) {
            // console.log("tem merda embaixo fim");
            return false;
          }
          if (matrix[y + i][x + j] != 0) {
            // console.log("tem merda embaixo 2 ");
            return false;
          }
        }
      } else {
        if (piece[i][j] != 0) {
          // console.log("x ", x + j, " y ", y + i, " piece: ", piece[i][j]);
          if (y + piece.length - 1 > height - 1) {
            // console.log("tem merda embaixo fim");
            return false;
          }
          if (matrix[y + i][x + j] != 0) {
            // console.log("tem merda embaixo 2 ");
            return false;
          }
        }
      }
    }
  }
  // console.log("nao tem nada embaixo");
  return true;
}

function verifyBoundriesLeft(piece, x, y) {
  x += piece[0].length - 1;
  // console.log("y: ", y);
  // console.log("x: ", x);
  // console.log("p.l: ", piece.length);
  // console.log("p[0].l: ", piece[0].length);
  for (let i = 0; i < piece.length; i++) {
    for (let j = piece[0].length - 1; j >= 0; j--) {
      // console.log("p1 ", piece[i][j], " p2 ", piece[i][j - 1], "\n");
      // console.log("x: ", j, " y ", i);
      // console.log("j - 1: ", j - 1);
      if (j >= 0) {
        if (piece[i][j] != 0 && piece[i][j - 1] != 9) {
          // console.log("entrou if 1: ", piece[i][j]);
          // console.log("x ", x - piece[0].length + j, " y ", y + i, " piece: ", piece[i][j]);
          if (y + piece.length - 1 > height - 1) {
            // console.log("tem merda embaixo fim");
            return false;
          }

          // console.log("y + i: ", y + i);
          if (matrix[y + i][x - piece[0].length + j] != 0) {
            // console.log("matrix[y + i][x - j - 1]: ", matrix[y + i][x - j - 1]);
            // console.log("tem merda do lado 1 ");
            return false;
          }
        }
      } else {
        if (piece[i][j] != 0) {
          // console.log("entrou if 2: ", piece[i][j]);
          // console.log("x ", x - piece[0].length + 1, " y ", y + i, " piece: ", piece[i][j]);

          if (y + piece.length - 1 > height - 1) {
            // console.log("tem merda embaixo fim");
            return false;
          }
          if (matrix[y + i][x - piece[0].length + 1] != 0) {
            // console.log("x + j - 1 : ", x - j - 1);
            // console.log("tem merda do lado 2 ");
            return false;
          }
        }
      }
      // console.log("************************");
    }
    // console.log("----------------------------");
  }
  // console.log("pode ir pra esquerda sim");
  return true;
}

function verifyBoundriesRight(piece, x, y) {
  // console.log("y: ", y);
  // console.log("x: ", x);
  // console.log("p.l: ", piece.length);
  // console.log("p[0].l: ", piece[0].length);
  for (let i = 0; i < piece.length; i++) {
    for (let j = 0; j < piece[0].length; j++) {
      // console.log("p1 ", piece[i][j], " p2 ", piece[i][j + 1]);
      if (j + 1 < piece[0].length) {
        if (piece[i][j] != 0 && piece[i][j + 1] != 9) {
          // console.log("x ", x + j + 1, " y ", y + i, " piece: ", piece[i][j]);
          if (y + piece.length - 1 > height - 1) {
            // console.log("tem merda embaixo fim");
            return false;
          }
          if (matrix[y + i][x + j + 1] != 0) {
            // console.log("tem merda do lado 1 ");
            return false;
          }
        }
      } else {
        if (piece[i][j] != 0) {
          // console.log("x ", x + j + 1, " y ", y + i, " piece: ", piece[i][j]);
          if (y + piece.length - 1 > height - 1) {
            // console.log("tem merda embaixo fim");
            return false;
          }
          if (matrix[y + i][x + j + 1] != 0) {
            // console.log("tem merda do lado 2 ");
            return false;
          }
        }
      }
    }
  }
  // console.log("pode ir pra direita sim");
  return true;
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
        // matrix[y + b][x + a] = 1;
        matrix[y + b][x + a] = CurrentPiece.idColor + 1;
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
      newPiece[x][y] = pieceAux[y][x];
    }
  }
  return newPiece;
}

function verifyLines() {
  var canvas = document.getElementById("game");
  var canvasContext = canvas.getContext("2d");
  // var hasSpecialPiece = false;
  var linesAux = 0;
  for (var y = 0; y < height && linesAux <= 4; y++) {
    var counter = 0;
    for (var x = 0; x < width; x++) {
      // console.table(matrix)
      if (matrix[y][x] != 0) counter++;
      // if (matrix[y][x] == 3) hasSpecialPiece = true;
      if (counter == width) {
        var matAux = matrix[y].find((x) => x == 3);
        // console.log(matAux);
        if (matAux) {
          rolling();
          canvasIverted = !canvasIverted;
        }
        for (var auxX = x; auxX >= 0; auxX--) {
          canvasContext.fillStyle = "white";
          canvasContext.fillRect(auxX * PS, y * PS, PS, PS);
          canvasContext.fillStyle = "black";
          canvasContext.strokeRect(auxX * PS, y * PS, PS, PS);
          matrix[y][auxX] = 0;
        }
        linesUpDown(y);
        linesAux++;
        linesCompleted++;
        linesComplete(linesCompleted);
      }
    }
  }
  var newScore = linesAux * 10 * linesAux;
  score += newScore;
  document.getElementById("score").innerHTML = `${score} Pontos`;

  difficulty(score);
}

function difficulty(score) {
  const multiplo = 300;
  if (score < multiplo) {
    document.getElementById("dificuldade").innerHTML = "1";
    level = 1;
    gameSpeed = 1000;
    clearInterval(pieceInterval);
    gameLevelUp();
  } else if (score >= multiplo && score < multiplo * 2) {
    document.getElementById("dificuldade").innerHTML = "2";
    level = 2;
    gameSpeed = 800;
    clearInterval(pieceInterval);
    gameLevelUp();
  } else if (score >= multiplo * 2 && score < multiplo * 3) {
    document.getElementById("dificuldade").innerHTML = "3";
    level = 3;
    gameSpeed = 600;
    clearInterval(pieceInterval);
    gameLevelUp();
  } else if (score >= multiplo * 3 && score < multiplo * 4) {
    document.getElementById("dificuldade").innerHTML = "4";
    level = 4;
    gameSpeed = 401;
    clearInterval(pieceInterval);
    gameLevelUp();
  } else if (score >= multiplo * 4 && score < multiplo * 5) {
    document.getElementById("dificuldade").innerHTML = "5";
    level = 5;
    gameSpeed = 200;
    clearInterval(pieceInterval);
    gameLevelUp();
  }
}

function gameLevelUp() {
  pieceInterval = setInterval(() => {
    lastY = CurrentPiece.y;
    if (
      verifyBoundriesDownFoda(
        CurrentPiece.piece,
        CurrentPiece.x,
        CurrentPiece.y + 1 // Antes estava medindo somente peças quadras, assim funciona de maneira humana
      )
    ) {
      // console.log(CurrentPiece.y + CurrentPiece.piece.length);
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
    if (
      !verifyBoundriesDownFoda(
        CurrentPiece.piece,
        CurrentPiece.x,
        CurrentPiece.y + 1
      )
    ) {
      verifyLines();
      generateNewPiece();
    }
    // console.log("y: ", CurrentPiece.y, " ly: ", lastY);
    if (CurrentPiece.y == lastY) {
      // Game Over
      alert("Game Over");
      // console.log("Stop");
      stop();
    }
  }, gameSpeed);
}

function linesComplete(linesCompleted) {
  document.getElementById("linhas").innerHTML = `${linesCompleted} Linhas`;
}

function rolling() {
  if (!canvasIverted) {
    document.getElementById("tetris").style.transform = "rotateZ(180deg)";
  } else {
    document.getElementById("tetris").style.transform = "rotateZ(360deg)";
  }
}

function linesUpDown(fromHeight) {
  var canvas = document.getElementById("game");
  var canvasContext = canvas.getContext("2d");

  for (var y = fromHeight; y > 0; y--) {
    var lineUp = y - 1;
    for (var x = 0; x < width; x++) {
      if (matrix[lineUp][x] != 0) {
        canvasContext.fillStyle = colors[matrix[lineUp][x] - 1];
        canvasContext.fillRect(x * PS, y * PS, PS, PS);
        canvasContext.fillStyle = "black";
        canvasContext.strokeRect(x * PS, y * PS, PS, PS);
        matrix[y][x] = matrix[lineUp][x];

        canvasContext.fillStyle = "white";
        canvasContext.fillRect(x * PS, lineUp * PS, PS, PS);
        canvasContext.fillStyle = "black";
        canvasContext.strokeRect(x * PS, lineUp * PS, PS, PS);
        matrix[lineUp][x] = 0;
      }
    }
  }
}
function clearRows() {
  var table = document.getElementById("playsTable");
  for (var x = 1; x < table.rows.length; x++) {
    table.deleteRow(x);
  }
}

function getUserLastPlays() {
  var http = new XMLHttpRequest();
  var url = "/web-rolling-tetris/server/getUserLastPlays.php";
  http.open("GET", url, true);
  http.send();
  http.onload = function () {
    if (http.status == 200) {
      plays = JSON.parse(http.response);
      if (plays.length > 0) {
        var table = document.getElementById("playsTable");
        // clearRows();
        playerName = plays[0].name;
        for (var x = plays.length; x > 0; x--) {
          var row = table.insertRow(1);
          var nameCell = row.insertCell(0);
          var pointsCell = row.insertCell(1);
          var levelCell = row.insertCell(2);
          var timeCell = row.insertCell(3);
          nameCell.innerHTML = plays[x - 1].name;
          pointsCell.innerHTML = plays[x - 1].pointsAchieved;
          levelCell.innerHTML = plays[x - 1].levelAchieved;
          timeCell.innerHTML = secondsConverted(plays[x - 1].durationTime);
        }
      }
    } else if (http.status == 401) {
      window.location.href = "./index.html";
    } else if (http.status == 500) {
      // window.location.href = "index.html";
      alert("Erro ao buscar partidas as ultimas partidas");
      // window.location.href = "../jogo.html";
    }
  };
}

function secondsConverted(seg) {
  var h = Math.floor(seg / (60 * 60));
  var r = seg % (60 * 60);
  var m = Math.floor(seg / 60);
  r %= 60;
  var s = Math.ceil(r);
  if (m) {
    return `${m}m:${s}s`;
  } else if (h) {
    return `${h}h:${hourConverted.m}m:${s}s`;
  } else {
    return `${s}s`;
  }
}