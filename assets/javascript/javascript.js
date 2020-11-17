
function Escolhatab(){
    

}


function Timer(){
  alert ("oi")
}


function Esquerda(){

}

function Direita(){

}

function Baixo(){

}

function Rotacionar(){

}

function Bonus(){
    
}

function Movimento(tecla){
    if(tecla.keyCode === 37) {
     Esquerda()
  } 
    else if(tecla.keyCode === 39) {
     Direita()
  } 
    else if(tecla.keyCode === 40) {
     Baixo()
  }
    else if(tecla.keyCode === 38) {
     Rotacionar() /* Tecla para cima */
}}