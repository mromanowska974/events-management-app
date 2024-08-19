import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private auth = inject(Auth);

  register(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password).then(data => data.user)
  }

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password).then(data => data.user)
  }

  logout(){
    return signOut(this.auth)
  }

  private alternativeLoginAuth(provider: any){
    return signInWithPopup(this.auth, provider).then(data => data.user)
  }

  googleLogin(){
    return this.alternativeLoginAuth(new GoogleAuthProvider)
  }

  facebookLogin(){
    return this.alternativeLoginAuth(new FacebookAuthProvider);
  }
}
