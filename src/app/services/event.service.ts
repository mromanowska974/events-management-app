import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, where } from '@angular/fire/firestore';
import { query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  firestore = inject(Firestore);
  
  collectionRef = collection(this.firestore, 'events');

  createEvent(event: any){
    return addDoc(this.collectionRef, {
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

  getEventsByOwnerId(uid: string){
    const ownerQuery = query(this.collectionRef, where('ownerId', '==', uid))

    return getDocs(ownerQuery).then(data => data.docs.map(doc => doc.data()))
  }

  getEventsByMemberId(uid: string){
    const memberQuery = query(this.collectionRef, where('members', 'array-contains', uid))

    return getDocs(memberQuery).then(data => data.docs.map(doc => doc.data()))
  }

  getPublicEvents(){
    const accessQuery = query(this.collectionRef, where('access', '==', 'Publiczne'))

    return getDocs(accessQuery).then(data => data.docs.map(doc => doc.data()))
  }
}
