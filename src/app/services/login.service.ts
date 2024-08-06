import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  afAuth = inject(AngularFireAuth);
  auth = inject(Auth);

  register(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logout(){
    return signOut(this.auth)
  }
}
