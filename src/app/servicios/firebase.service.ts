import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs: AngularFirestore, public autenticacionService: AutenticacionService) { }

  getUsers() {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/users').valueChanges().subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }

  getResults() {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/results').valueChanges().subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }

  addResult(game: any, points: any, win: any) {
    const date = new Date();
    const result = {
      createdAt: date.toLocaleDateString(),
      game: game,
      idUser: this.autenticacionService.Usuario.email,
      points: points,
      win: win
    }
    const id = this.afs.createId();
    return this.afs.collection('/results').doc(id).set(result);
  }

  addUser(email: any) {
    const date = new Date();
    const user = {
      createdAt: date.toLocaleDateString(),
      id: Math.floor(Math.random() * Math.floor(6)),
      name: email.split('@')[0],
      mail: email
    }
    const id = this.afs.createId();
    return this.afs.collection('/users').doc(id).set(user);
  }

}
