import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { User } from '../models/user';
import { concatMap, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  firestore = inject(Firestore);
  userService = inject(UserService);

  startChat(otherUser: User){
    const chatsRef = collection(this.firestore, 'chats');
    return this.userService.activeUser$.pipe(
      take(1),
      concatMap(user => addDoc(chatsRef, {
        users: [{
          id: user.uid,
          name: user.nickname,
          photo: user.profileImageUrl
        }, {
          id: otherUser.uid,
          name: otherUser.nickname,
          photo: otherUser.profileImageUrl
        }]
      })),
      map(ref => ref.id)
    )
  }
}
