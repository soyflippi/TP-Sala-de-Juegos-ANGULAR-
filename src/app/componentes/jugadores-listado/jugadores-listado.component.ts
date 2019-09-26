import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.scss']
})
export class JugadoresListadoComponent implements OnInit {
  isLoading: boolean = false;
  listado: any
  miJugadoresServicio: JugadoresService

  constructor(serviceJugadores: JugadoresService, public firebaseService: FirebaseService) {
    this.miJugadoresServicio = serviceJugadores;
  }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.isLoading = true;
    this.firebaseService.getUsers()
      .then(result => {
        this.isLoading = false;
        console.log(result);
        this.listado = result;
      })
  }

}
