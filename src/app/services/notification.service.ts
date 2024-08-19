import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private firestore = inject(Firestore);

    getNotifications(uid){
      const collectionRef = collection(this.firestore, `users/${uid}/notifications`)
  
      return getDocs(collectionRef).then(data => data.docs.map(doc => {
        return {
          id: doc.id,
          name: doc.data()['name'],
          content: doc.data()['content'],
          type: doc.data()['type'],
          toEvent: doc.data()['toEvent'] ? doc.data()['toEvent'] : null,
          from: doc.data()['from']
        }
      }))
    }
  
    sendLeavingNotification(fromUser, toUid, eventName){
      const collectionRef = collection(this.firestore, `users/${toUid}/notifications`)
  
      return addDoc(collectionRef, {
        name: 'Opuszczono wydarzenie',
        content: 'Użytkownik '+fromUser.nickname+' opuścił wydarzenie: '+eventName,
        type: 'user-left',
        from: fromUser.uid
      })
    }

    sendRemovingNotification(fromUser, toUid, eventName){
      const collectionRef = collection(this.firestore, `users/${toUid}/notifications`)
  
      return addDoc(collectionRef, {
        name: 'Usunięto Cię z wydarzenia',
        content: 'Użytkownik '+fromUser.nickname+' usunął Cię z wydarzenia: '+eventName,
        type: 'user-removed',
        from: fromUser.uid
      })
    }

    sendDeletedEventNotification(fromUser, toUid, eventName){
      const collectionRef = collection(this.firestore, `users/${toUid}/notifications`)
  
      return addDoc(collectionRef, {
        name: 'Usunięto wydarzenie',
        content: 'Użytkownik '+fromUser.nickname+' usunął wydarzenie: '+eventName,
        type: 'event-deleted',
        from: fromUser.uid
      })
    }
  
    readNotification(id, uid){
      const docRef = doc(this.firestore, `users/${uid}/notifications/${id}`)
  
      return deleteDoc(docRef);
    }
}
