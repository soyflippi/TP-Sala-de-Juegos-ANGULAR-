import { AutenticacionService } from './../../servicios/autenticacion.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild("navbarHeader", { static: true }) navbarHeader;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public autenticacionService: AutenticacionService) {
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(() => {
      // Agregams handler para ocultar la navbar al momento de cambiar la ruta
      this.navbarHeader.nativeElement.classList.remove("show");
    })
  }

  ngOnInit() { }

  onLogout() {
    this.autenticacionService.logout();
  }

  Juego(tipo: string) {
    switch (tipo) {
      case 'Adivina':
        this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'Agilidad':
        this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'AdivinaMasListado':
        this.router.navigate(['/Juegos/AdivinaMasListado']);
        break;
      case 'AgilidadaMasListado':
        this.router.navigate(['/Juegos/AgilidadaMasListado']);
        break;
    }
  }

}
