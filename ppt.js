let jugador = 0;
let computadora = 0;

const opciones = ["Piedra", "Papel", "Tijera"];

function jugar(eleccionJugador){

    const eleccionPC = opciones[Math.floor(Math.random()*3)];

    document.getElementById("usuario").textContent =
    "Tú elegiste: " + eleccionJugador;

    document.getElementById("pc").textContent =
    "Computadora eligió: " + eleccionPC;

    let resultado = "";

    if(eleccionJugador === eleccionPC){

        resultado = "🤝 ¡Empate!";

    }

    else if(

        (eleccionJugador==="Piedra" && eleccionPC==="Tijera") ||

        (eleccionJugador==="Papel" && eleccionPC==="Piedra") ||

        (eleccionJugador==="Tijera" && eleccionPC==="Papel")

    ){

        resultado = "🎉 ¡Ganaste!";

        jugador++;

    }

    else{

        resultado = "💻 ¡Ganó la computadora!";

        computadora++;

    }

    document.getElementById("resultado").textContent = resultado;

    document.getElementById("puntosJugador").textContent = jugador;

    document.getElementById("puntosPC").textContent = computadora;

}

document.getElementById("reiniciarPPT").addEventListener("click",()=>{

jugador=0;

computadora=0;

document.getElementById("puntosJugador").textContent=0;

document.getElementById("puntosPC").textContent=0;

document.getElementById("usuario").textContent="";

document.getElementById("pc").textContent="";

document.getElementById("resultado").textContent="";

});