import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.scss']
})

export class AgilidadAritmeticaComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  nuevoJuego: JuegoAgilidad;


  ngOnInit() {
  }

  constructor(public firebaseService: FirebaseService) {
    this.nuevoJuego = new JuegoAgilidad();
    this.newGame();
    console.info("Inicio agilidad");
  }



  newGame() {
    if (this.nuevoJuego.scorePlayer > 0) {
      this.loadResult();
    }
    this.nuevoJuego.reloadPage();
  }

  loadResult() {
    this.firebaseService.addResult('AgilidadAritmetica', this.nuevoJuego.scorePlayer, (this.nuevoJuego.lifePlayer > 0))
      .then(result => {
        console.log("insert result");
      });
  }
}
