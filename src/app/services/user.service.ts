import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  firestore = inject(Firestore)

  activeUser = new BehaviorSubject(null);

  //USER

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

  getUser(uid: string): Promise<User>{
    const docRef = doc(this.firestore, `users/${uid}`);

    return getDoc(docRef).then(data => {
      return {
        uid: data.id,
        email: data.data()!['email'],
        nickname: data.data()!['nickname'],
        notifications: []
      }
    });
  }

  getAllUsers(): Promise<User[]>{
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
