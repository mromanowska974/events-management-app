import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  firestore = inject(Firestore)

  activeUser = new BehaviorSubject(null);

  setActiveUser(user: any){
    this.activeUser.next(user)
  }

  createUser(uid: string, userData: any){
    const docRef = doc(this.firestore, `users/${uid}`);

    return setDoc(docRef, {
      email: userData,
      nickname: userData
    })
  }

  getUser(uid: string){
    const docRef = doc(this.firestore, `users/${uid}`);

    return getDoc(docRef).then(data => data.data());
  }
}
