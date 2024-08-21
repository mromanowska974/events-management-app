import { inject, Injectable } from '@angular/core';
import { Auth, AuthCredential, createUserWithEmailAndPassword, EmailAuthProvider, FacebookAuthProvider, GoogleAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updatePassword } from '@angular/fire/auth';

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

  resetPassword(email){
    return sendPasswordResetEmail(this.auth, email)
  }

  changePassword(oldPassword: string, newPassword: string){
    const user = this.auth.currentUser;
    const credential = EmailAuthProvider.credential(user!.email!, oldPassword);

    return this.reauthenticate(user, credential).then(() => {
      updatePassword(user!, newPassword);
    })
  }

  changeEmail(newEmail: string, password: string){
    const user = this.auth.currentUser;
    const credential = EmailAuthProvider.credential(user!.email!, password);

    return this.reauthenticate(user, credential).then(() => {
      updateEmail(user!, newEmail);
    })
  }

  private reauthenticate(user, credential){
    return reauthenticateWithCredential(user!, credential)
  }

  checkProvider(){
    const user = this.auth.currentUser;

    return user?.getIdTokenResult().then(result => result.signInProvider)
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
