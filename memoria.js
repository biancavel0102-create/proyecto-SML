const tablero = document.getElementById("tableroMemoria");

const mensaje = document.getElementById("mensajeMemoria");

const reiniciar = document.getElementById("reiniciarMemoria");

const emojis = [

"🐶","🐱","🐼","🦊",

"🐶","🐱","🐼","🦊"

];

let cartas = [];

let primera = null;

let segunda = null;

let bloqueo = false;

function iniciar(){

tablero.innerHTML="";

mensaje.textContent="";

primera=null;

segunda=null;

bloqueo=false;

cartas=[...emojis];

cartas.sort(()=>Math.random()-0.5);

cartas.forEach((emoji,index)=>{

const carta=document.createElement("div");

carta.classList.add("cartaMemoria");

carta.dataset.valor=emoji;

carta.dataset.index=index;

carta.textContent="?";

carta.addEventListener("click",voltear);

tablero.appendChild(carta);

});

}

function voltear(){

if(bloqueo)return;

if(this.textContent!="?")return;

this.textContent=this.dataset.valor;

if(!primera){

primera=this;

return;

}

segunda=this;

bloqueo=true;

if(primera.dataset.valor===segunda.dataset.valor){

primera=null;

segunda=null;

bloqueo=false;

comprobarVictoria();

}else{

setTimeout(()=>{

primera.textContent="?";

segunda.textContent="?";

primera=null;

segunda=null;

bloqueo=false;

},800);

}

}

function comprobarVictoria(){

const cartas=document.querySelectorAll(".cartaMemoria");

let gano=true;

cartas.forEach(c=>{

if(c.textContent=="?"){

gano=false;

}

});

if(gano){

mensaje.textContent="🎉 ¡Encontraste todas las parejas!";

}

}

reiniciar.addEventListener("click",iniciar);

iniciar();