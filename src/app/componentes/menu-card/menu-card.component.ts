import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  Juego(tipo: number) {
    switch (tipo) {
      case 1:
        this.router.navigate(['/Juegos/Flippisay']);
        break;
      case 2:
        this.router.navigate(['/Juegos/Anagrama']);
        break;
      case 3:
        this.router.navigate(['/Juegos/PiedraPapelTijera']);
        break;
      case 4:
        this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 5:
        this.router.navigate(['/Juegos/Adivina']);
        break;
      case 6:
        this.router.navigate(['/Juegos/Tateti']);
        break;
    }
  }
}
