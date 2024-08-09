import { inject, Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDocs, updateDoc, where } from '@angular/fire/firestore';
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

  editEvent(event: any, eid: string){
    const eventRef = doc(this.firestore, `events/${eid}`)

    return updateDoc(eventRef, event)
  }

  getEventsByOwnerId(uid: string){
    const ownerQuery = query(this.collectionRef, where('ownerId', '==', uid))

    return getDocs(ownerQuery).then(data => data.docs.map(doc => {
      return {
        id: doc.id,
        name: doc.data()['name'],
        date: doc.data()['date'],
        place: doc.data()['place'],
        description: doc.data()['description'],
        access: doc.data()['access'],
        membersAmount: doc.data()['membersAmount'],
        ownerId: doc.data()['ownerId'],
        members: doc.data()['members']
      }
    }))
  }

  getEventsByMemberId(uid: string){
    const memberQuery = query(this.collectionRef, where('members', 'array-contains', uid))

    return getDocs(memberQuery).then(data => data.docs.map(doc => {
      return {
        id: doc.id,
        name: doc.data()['name'],
        date: doc.data()['date'],
        place: doc.data()['place'],
        description: doc.data()['description'],
        access: doc.data()['access'],
        membersAmount: doc.data()['membersAmount'],
        ownerId: doc.data()['ownerId'],
        members: doc.data()['members']
      }
    }))
  }

  getPublicEvents(){
    const accessQuery = query(this.collectionRef, where('access', '==', 'Publiczne'))

    return getDocs(accessQuery).then(data => data.docs.map(doc => {
      return {
        id: doc.id,
        name: doc.data()['name'],
        date: doc.data()['date'],
        place: doc.data()['place'],
        description: doc.data()['description'],
        access: doc.data()['access'],
        membersAmount: doc.data()['membersAmount'],
        ownerId: doc.data()['ownerId'],
        members: doc.data()['members']
      }
    }))
  }
}
