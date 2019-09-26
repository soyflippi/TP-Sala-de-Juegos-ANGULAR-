
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.scss']
})
export class ListadoDeResultadosComponent implements OnInit {
  listado: Array<any>;
  isLoading: boolean = false;
  constructor(public firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.obtenerResultados();
  }

  obtenerResultados() {
    this.isLoading = true;
    this.firebaseService.getResults()
      .then(result => {
        this.isLoading = false;
        console.log(result);
        this.listado = result;
      });
  }

}
