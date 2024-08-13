import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
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

    return getDoc(docRef).then(data => {
      return {
        uid: data.id,
        email: data.data()!['email'],
        nickname: data.data()!['nickname']
      }
    });
  }

  getAllUsers(){
    const collectionRef = collection(this.firestore, 'users');

    return getDocs(collectionRef).then(data => data.docs.map(user => {
      return {
        uid: user.id,
        email: user.data()['email'],
        nickname: user.data()['nickname']
      }
    }))
  }
}
