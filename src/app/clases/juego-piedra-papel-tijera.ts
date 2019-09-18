import { Juego } from '../clases/juego'

export class JuegoPiedraPapelTijera extends Juego {

  numeroSecreto: number = 0;
  numeroIngresado: number = 0;

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super("Adivina el número", gano, jugador);
  }

  public verificar() {
    this.gano = false;
    if (this.numeroIngresado == this.numeroSecreto) {
      this.gano = true;
    }
    return this.gano;
  }

  public generarnumero() {
    this.numeroSecreto = Math.floor((Math.random() * 100) + 1);
    console.info('numero Secreto:' + this.numeroSecreto);
    this.gano = false;
  }

}



//Juego piedra papel o tijeras.

//Primera parte del juego, pide al usuario que elija entre piedra, papel o tijera.
var decisionUsuario = prompt("¿Piedra, papel o tijera?");

//Segunda parte del juego. El ordenador "decide" su elección de forma aleatoria.
var aleatorio = function() {
    var numero =  Math.floor((Math.random()*3)+1); 
    var respuesta;
    if (numero == 1) {
        respuesta = "Piedra";
    } else if (numero == 2) {
        respuesta = "Papel";
    } else {
        respuesta = "Tijera";
    }
    return respuesta;
};

var decisionOrdenador = aleatorio();
console.log ("Usuario: " +decisionUsuario + ", Ordenador: " +decisionOrdenador);

logicaJuego(decisionUsuario, decisionOrdenador);

//Tercera parte del juego. Se decide quién es el ganador
var logicaJuego = function(decisionUsuario, decisionOrdenador) {
    if (decisionUsuario == decisionOrdenador) {
        return console.log("Empate, los dos eligieron " +decisionUsuario);
    } else {
        if (decisionUsuario == "Piedra" && decisionOrdenador == "Papel") {
            console.log(""+decisionUsuario +" vs " +decisionOrdenador + ", gana el ordenador.");
        } 
        if (decisionUsuario == "Piedra" && decisionOrdenador == "Tijera") {
            console.log(""+decisionUsuario +" vs " +decisionOrdenador + ", gana el usuario");
        } 
        if (decisionUsuario == "Papel" && decisionOrdenador == "Tijera") { 
            console.log(""+decisionUsuario +" vs " +decisionOrdenador + ", gana el ordenador.");
         }
         if (decisionUsuario == "Papel" && decisionOrdenador == "Piedra"){
            console.log(""+decisionUsuario +" vs " +decisionOrdenador + ", gana el usuario");
        }
         if (decisionUsuario == "Tijera" && decisionOrdenador == "Piedra") {
            console.log(""+decisionUsuario +" vs " +decisionOrdenador + ", gana el ordenador.");
            }
         if (decisionUsuario == "Tijera" && decisionOrdenador == "Papel") {
            console.log(""+decisionUsuario +" vs " +decisionOrdenador + ", gana el usuario");
        }
    }
};
