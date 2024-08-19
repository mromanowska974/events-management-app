import { inject, Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private firestore = inject(Firestore);

  sendInvitation(user: User, event: Event, selectedUserId){
    const notifictaionsRef = collection(this.firestore, `users/${selectedUserId}/notifications`);

    return addDoc(notifictaionsRef, {
      name: 'Zaproszenie do wydarzenia',
      content: 'Użytkownik '+user.nickname+' zaprasza Cię do wydarzenia: '+event.name,
      type: 'invitation',
      from: user.uid,
      toEvent: event.id
    })
  }

  acceptInvitation(fromUser, toUid) {
    const notifictaionsRef = collection(this.firestore, `users/${toUid}/notifications`);

    return addDoc(notifictaionsRef, {
      name: 'Przyjęto zaproszenie',
      content: 'Użytkownik '+fromUser.nickname+' przyjął Twoje zaproszenie.',
      type: 'accept',
      from: fromUser.uid
    })
  }

  declineInvitation(fromUser, toUid) {
    const notifictaionsRef = collection(this.firestore, `users/${toUid}/notifications`);

    return addDoc(notifictaionsRef, {
      name: 'Odrzucono zaproszenie',
      content: 'Użytkownik '+fromUser.nickname+' odrzucił Twoje zaproszenie.',
      type: 'decline',
      from: fromUser.uid
    })
  }
}
