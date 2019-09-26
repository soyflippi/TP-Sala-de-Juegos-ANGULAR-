import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('alertError', { static: true }) alertError: ElementRef;
  isLoading: boolean = false;
  constructor(private autenticacionService: AutenticacionService) { }

  ngOnInit() { }

  onLogin(userEmail, userPassword) {
    this.isLoading = true;
    this.autenticacionService.login(userEmail, userPassword).then((result) => {
      this.isLoading = false;
    }).catch((error) => {
      this.isLoading = false;
      this.mostrarAlert();
      console.info(error);
    });
  }

  mostrarAlert() {
    this.alertError.nativeElement.classList.remove('d-none');
  }
}
