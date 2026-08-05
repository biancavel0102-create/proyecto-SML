const casillas = document.querySelectorAll(".casilla");

const turnoTexto = document.getElementById("turno");

const reiniciar = document.getElementById("reiniciar");

let turno = "X";

let tablero = ["","","","","","","","",""];

let jugando = true;

const ganar = [

[0,1,2],

[3,4,5],

[6,7,8],

[0,3,6],

[1,4,7],

[2,5,8],

[0,4,8],

[2,4,6]

];

casillas.forEach(casilla=>{

casilla.addEventListener("click",clickCasilla);

});

function clickCasilla(){

const indice=this.dataset.index;

if(tablero[indice]!=""||!jugando){

return;

}

tablero[indice]=turno;

this.textContent=turno;

comprobarGanador();

}

function comprobarGanador(){

let victoria=false;

for(let i=0;i<ganar.length;i++){

const condicion=ganar[i];

const a=tablero[condicion[0]];

const b=tablero[condicion[1]];

const c=tablero[condicion[2]];

if(a==""||b==""||c==""){

continue;

}

if(a==b&&b==c){

victoria=true;

}

}

if(victoria){

turnoTexto.textContent="🎉 Ganó "+turno;

jugando=false;

return;

}

if(!tablero.includes("")){

turnoTexto.textContent="Empate";

jugando=false;

return;

}

turno=turno=="X"?"O":"X";

turnoTexto.textContent="Turno de "+turno;

}

reiniciar.addEventListener("click",()=>{

turno="X";

tablero=["","","","","","","","",""];

jugando=true;

turnoTexto.textContent="Turno de X";

casillas.forEach(c=>{

c.textContent="";

});

});