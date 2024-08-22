import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, orderBy, query, Timestamp, updateDoc, where } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { User } from '../models/user';
import { concatMap, map, Observable, take } from 'rxjs';
import { Chat } from '../models/chat';
import { Message } from '../models/message';

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
        userIds: [user.uid, otherUser.uid],
        usersInfo: [{
          name: user.nickname,
          photo: user.profileImageUrl
        }, {
          name: otherUser.nickname,
          photo: otherUser.profileImageUrl
        }]
      })),
      map(ref => ref.id)
    )
  }

  get chats$(): Observable<Chat[]> {
    const chatsRef = collection(this.firestore, 'chats');

    const myQuery = query(chatsRef, where('userIds', 'array-contains', localStorage.getItem('uid')))
    return collectionData(myQuery, {idField: 'id'}).pipe(
      map(chats => this.displayChats(localStorage.getItem('uid')!, chats as Chat[]))
    ) as Observable<Chat[]>;
  }

  private displayChats(activeUserId: string, chats: Chat[]){
    chats.forEach(chat => {
      const otherUserInfo = chat.userIds.indexOf(activeUserId) === 0 ? chat.usersInfo[1] : chat.usersInfo[0];

      chat.chatName = otherUserInfo.name;
      chat.chatImageUrl = otherUserInfo.photo;
    });

    return chats;
  }

  sendMessage(chatId: string, message: string){
    const chatsRef = collection(this.firestore, `chats/${chatId}/messages`);
    const chatRef = doc(this.firestore, `chats/${chatId}`);

    const senderId = localStorage.getItem('uid');
    const today = Timestamp.fromDate(new Date());

    return addDoc(chatsRef, {
      text: message,
      senderId: senderId,
      sendDate: today
    }).then(() => {
      updateDoc(chatRef, {
        lastMessage: message,
        lastMessageDate: today
      })
    })
  }

  getChatMessages$(chatId: string): Observable<Message[]> {
    const chatsRef = collection(this.firestore, `chats/${chatId}/messages`);
    const queryAll = query(chatsRef, orderBy('sendDate', 'asc'));

    return collectionData(queryAll) as Observable<Message[]>;
  }
}
