import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private firestore = inject(Firestore);

  sendRequest(user: User, event: Event){
    const notifictaionsRef = collection(this.firestore, `users/${event.ownerId}/notifications`);

    return addDoc(notifictaionsRef, {
      name: 'Prośba o dołączenie do wydarzenia',
      content: 'Użytkownik '+user.nickname+' prosi o dołączenie do wydarzenia: '+event.name,
      type: 'request',
      from: user.uid,
      toEvent: event.id
    })
  }

  acceptRequest(fromUser, toUid) {
    const notifictaionsRef = collection(this.firestore, `users/${toUid}/notifications`);

    return addDoc(notifictaionsRef, {
      name: 'Przyjęto prośbę',
      content: 'Użytkownik '+fromUser.nickname+' przyjął Twoją prośbę.',
      type: 'accept',
      from: fromUser.uid
    })
  }

  declineRequest(fromUser, toUid) {
    const notifictaionsRef = collection(this.firestore, `users/${toUid}/notifications`);

    return addDoc(notifictaionsRef, {
      name: 'Odrzucono prośbę',
      content: 'Użytkownik '+fromUser.nickname+' odrzucił Twoją prośbę.',
      type: 'decline',
      from: fromUser.uid
    })
  }
}
