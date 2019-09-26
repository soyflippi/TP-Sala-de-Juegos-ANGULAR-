import { Component, OnInit } from '@angular/core';
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  public listadoParaCompartir: Array<any>;
  miServicioJuego: JuegoServiceService

  constructor(servicioJuego: JuegoServiceService) {
    this.miServicioJuego = servicioJuego;
  }

  ngOnInit() {
  }
}
