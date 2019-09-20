import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';
import { AdivinaElNumeroComponent } from '../componentes/adivina-el-numero/adivina-el-numero.component';
import { ListadoDeResultadosComponent } from '../componentes/listado-de-resultados/listado-de-resultados.component';
import { LoginComponent } from '../componentes/login/login.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { AgilidadAritmeticaComponent } from '../componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { MenuComponent } from '../componentes/menu/menu.component';
import { AdivinaMasListadoComponent } from '../componentes/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from '../componentes/agilidad-mas-listado/agilidad-mas-listado.component';
import { ListadoComponent } from '../componentes/listado/listado.component'
import { ListadosComponent } from '../componentes/listados/listados.component';
import { JuegosComponent } from '../componentes/juegos/juegos.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { MenuCardComponent } from '../componentes/menu-card/menu-card.component';
import { CabeceraComponent } from '../componentes/cabecera/cabecera.component';
import { QuienSoyComponent } from '../componentes/quien-soy/quien-soy.component'
import { ListadoDePaisesComponent } from '../componentes/listado-de-paises/listado-de-paises.component'
import { MapaDeGoogleComponent } from '../componentes/mapa-de-google/mapa-de-google.component'
import { JugadoresListadoComponent } from '../componentes/jugadores-listado/jugadores-listado.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { TatetiComponent } from '../componentes/tateti/tateti.component';


// declaro donde quiero que se dirija
const MiRuteo = [
  // Fuera del guard
  { path: '', component: PrincipalComponent, data: { animation: 'Home' } },
  { path: 'Login', component: LoginComponent, data: { animation: 'About' } },
  { path: 'Registro', component: RegistroComponent, data: { animation: 'Contact' } },
  { path: 'About', component: QuienSoyComponent, data: { animation: 'Contact' } },
  // Rutas protegias, debe estar logeado
  {
    path: 'Mapa', component: MapaDeGoogleComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'Principal', component: PrincipalComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'Listado', component: ListadoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'Paises', component: ListadoDePaisesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'Jugadores', component: JugadoresListadoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'Juegos',
    component: JuegosComponent,
    canActivate: [AuthGuardService],
    children:
      [{ path: '', component: MenuCardComponent },
      { path: 'Flippisay', component: AdivinaElNumeroComponent },
      { path: 'Anagrama', component: AdivinaElNumeroComponent },
      { path: 'PiedraPapelTijera', component: AdivinaElNumeroComponent },
      { path: 'Agilidad', component: AdivinaElNumeroComponent },
      { path: 'Adivina', component: AdivinaElNumeroComponent },
      { path: 'Tateti', component: TatetiComponent },

      { path: 'AdivinaMasListado', component: AdivinaMasListadoComponent },
      { path: 'AgilidadaMasListado', component: AgilidadMasListadoComponent }]
  },
  { path: '**', component: ErrorComponent },
  { path: 'error', component: ErrorComponent }];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteandoModule { }
