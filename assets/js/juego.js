/**
 * 2C = Two of Clubs    (Trevoles)
 * 2D = Two of DIAMONDS (diamantes)
 * 2H = Two of HEARDS   (corazones)
 * 2S = Two of SPADES   (espadas)
 */
let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0;
let puntosComputadora = 0;

const btnPedir         = document.querySelector("#pedir");
const btnDetener       = document.querySelector("#detener");
const btnNuevo         = document.querySelector("#nuevo");
const asignarSuma      = document.querySelectorAll("small");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasCompu   = document.querySelector("#computadora-cartas");

// funcion crea- un nuevo deck
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  //  shuffle nos ayuda a desordenar el array
  deck = _.shuffle(deck);
  return deck;
};

crearDeck();

// pedimos cartas al deck
const pedirCartas = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }

  const carta = deck.pop();
  return carta;
};

pedirCartas();

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor) ? (valor === "A" ? 11 : 10) : Number(valor);
};

// valor computadora
const turnoCmputadora = (puntosMinimos) => {
  do {
    const carta = pedirCartas();
    puntosComputadora = puntosComputadora + valorCarta(carta);

    console.log(puntosComputadora);
    asignarSuma[1].innerText = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasCompu.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  setTimeout (() =>{
    if(puntosComputadora === puntosMinimos){
      alert('Empate..');
    } else if ( puntosMinimos > 21){
      alert('Computadora gana');
    } else if( puntosComputadora > 21){
      alert('Ganaste!!!');
    } else {
      alert('Computadora gana');
    }
  }, 10)


};

const valor = valorCarta(pedirCartas());

// events

btnPedir.addEventListener("click", () => {
  const carta = pedirCartas();

  puntosJugador = puntosJugador + valorCarta(carta);

  console.log(puntosJugador);
  asignarSuma[0].innerText = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn("Haz perdido");
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoCmputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("Haz ganado");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoCmputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;

  turnoCmputadora(puntosJugador);
});

btnNuevo.addEventListener("click", () => {

  console.clear();
 deck = crearDeck();

  btnPedir.disabled = false;
  btnDetener.disabled = false;

  asignarSuma[1].innerText = 0;
  asignarSuma[0].innerText = 0;

  asignarSuma[0] = 0;
  asignarSuma[1] = 0;

  divCartasJugador.innerHTML = '';
  divCartasCompu.innerHTML = '';

});