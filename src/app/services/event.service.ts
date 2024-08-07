import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  firestore = inject(Firestore);
  
  createEvent(event: any){
    const collectionRef = collection(this.firestore, 'events');

    return addDoc(collectionRef, {
      name: event.name,
      description: event.description,
      date: event.date,
      place: event.place,
      access: event.access,
      membersAmount: event.membersAmount,
      ownerId: localStorage.getItem('uid'),
      members: []
    })
  }
}
