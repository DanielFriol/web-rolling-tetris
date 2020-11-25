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

function Timer() {

var segundos = 0;
var minutos = 0;

setInterval(function(){
  segundos++;
    if (segundos > 59){ /*Se segundos forem maiores que 59*/
     segundos = 0; /*Zera os segundos*/ 
     minutos++; /*e Incrementa os minutos*/
  }
    document.getElementById("tempo").innerHTML = minutos + "m" + " : " + segundos + "s";
 }, 1000);
}
