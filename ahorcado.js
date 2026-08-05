const palabras = [
    "PERRO",
    "GATO",
    "JAVASCRIPT",
    "HTML",
    "CSS",
    "PROGRAMACION",
    "TRIQUI",
    "MEMORIA",
    "AZUL",
    "COMPUTADOR",
    "JUEGO",
    "CODIGO"
];

let palabra = "";
let palabraOculta = [];
let intentos = 6;
let letrasUsadas = [];

const palabraElemento = document.getElementById("palabra");
const intentosElemento = document.getElementById("intentos");
const usadasElemento = document.getElementById("usadas");
const mensajeElemento = document.getElementById("mensaje");
const inputLetra = document.getElementById("letra");
const botonProbar = document.getElementById("probar");
const botonReiniciar = document.getElementById("reiniciarAhorcado");

function iniciarJuego() {

    palabra = palabras[Math.floor(Math.random() * palabras.length)];

    palabraOculta = [];

    letrasUsadas = [];

    intentos = 6;

    mensajeElemento.textContent = "";

    inputLetra.value = "";

    inputLetra.disabled = false;
    botonProbar.disabled = false;

    for (let i = 0; i < palabra.length; i++) {
        palabraOculta.push("_");
    }

    actualizarPantalla();
}

function actualizarPantalla() {

    palabraElemento.textContent = palabraOculta.join(" ");

    intentosElemento.textContent = intentos;

    usadasElemento.textContent = letrasUsadas.join(", ");
}

function probarLetra() {

    let letra = inputLetra.value.toUpperCase();

    inputLetra.value = "";

    if (letra === "") {
        alert("Escribe una letra.");
        return;
    }

    if (letrasUsadas.includes(letra)) {
        alert("Ya utilizaste esa letra.");
        return;
    }

    letrasUsadas.push(letra);

    let encontrada = false;

    for (let i = 0; i < palabra.length; i++) {

        if (palabra[i] === letra) {

            palabraOculta[i] = letra;

            encontrada = true;
        }

    }

    if (!encontrada) {
        intentos--;
    }

    actualizarPantalla();

    if (!palabraOculta.includes("_")) {

        mensajeElemento.textContent = "🎉 ¡Ganaste!";

        inputLetra.disabled = true;
        botonProbar.disabled = true;

    } else if (intentos === 0) {

        mensajeElemento.textContent = "💀 Perdiste. La palabra era: " + palabra;

        inputLetra.disabled = true;
        botonProbar.disabled = true;

    }

}

botonProbar.addEventListener("click", probarLetra);

inputLetra.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        probarLetra();
    }

});

botonReiniciar.addEventListener("click", iniciarJuego);

iniciarJuego();