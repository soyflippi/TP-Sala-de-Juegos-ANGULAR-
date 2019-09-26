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
    const date = new Date('2015-02-10T10:12:50.5000z');
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

}
