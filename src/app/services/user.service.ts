import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, from } from 'rxjs';
import { User } from '../models/user';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore)
  private storage = inject(Storage);

  activeUser$ = new BehaviorSubject<User>(new User());

  setActiveUser(user: User){
    this.activeUser$.next(user)
  }

  async createUser(uid: string, email: string){
    const docRef = doc(this.firestore, `users/${uid}`);
    const storageRef = ref(this.storage, 'images/profiles/user-icon.png')

    const imgUrl = await getDownloadURL(storageRef).then((url): string => url)

    return setDoc(docRef, {
      email: email,
      nickname: email.substring(0, email.indexOf('@')),
      profileImageUrl: imgUrl
    })
  }

  modifyUserData(uid, propToEdit, propValue){
    const docRef = doc(this.firestore, `users/${uid}`);

    return updateDoc(docRef, {
      [propToEdit]: propValue
    })
  }

  getUser(uid: string): Promise<User>{
    const docRef = doc(this.firestore, `users/${uid}`);

    return getDoc(docRef).then(data => {
      return {
        uid: data.id,
        email: data.data()!['email'],
        nickname: data.data()!['nickname'],
        notifications: data.data()!['notifications'],
        profileImageUrl: data.data()!['profileImageUrl']
      }
    });
  }

  getAllUsers(): Promise<User[]>{
    const collectionRef = collection(this.firestore, 'users');

    return getDocs(collectionRef).then(data => data.docs.map(user => {
      return {
        uid: user.id,
        email: user.data()['email'],
        nickname: user.data()['nickname'],
        profileImageUrl: user.data()['profileImageUrl']
      }
    }))
  }
}
