import { inject, Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  firestore = inject(Firestore);

  sendInvitation(nickname, eventName, selectedUserId){
    const notifictaionsRef = collection(this.firestore, `users/${selectedUserId}/notifications`);

    return addDoc(notifictaionsRef, {
      content: 'Użytkownik '+nickname+' zaprasza Cię do wydarzenia: '+eventName,
      type: 'invitation',
      isRead: false
    })
  }

  acceptInvitation() {

  }

  declineInvitation() {

  }
}
