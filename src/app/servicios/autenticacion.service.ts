import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  usuario: User;

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.usuario = user;
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
      } else {
        localStorage.setItem('usuario', null);
      }
    })
  }

  get isLoggedIn(): boolean {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    return usuario !== null;
  }

  get Usuario(): User {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    return usuario;
  }

  async login(email: string, password: string) {
    var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['/Juegos']);
  }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      throw error.message;
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }

}
