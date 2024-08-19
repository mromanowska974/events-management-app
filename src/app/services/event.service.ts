import { inject, Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, updateDoc, where } from '@angular/fire/firestore';
import { query } from 'firebase/firestore';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private firestore = inject(Firestore);
  
  private collectionRef = collection(this.firestore, 'events');

  createEvent(event: Event){
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

  editEvent(event, eid: string){
    const eventRef = doc(this.firestore, `events/${eid}`)

    return updateDoc(eventRef, event)
  }

  modifyMembersList(eid: string, members){
    const eventRef = doc(this.firestore, `events/${eid}`)

    return updateDoc(eventRef, {
      members: members
    })
  }

  getEvent(eid: string): Promise<Event>{
    const eventRef = doc(this.firestore, `events/${eid}`)

    return getDoc(eventRef).then(data => {
      return {
        id: data.id,
        name: data.data()!['name'],
        date: data.data()!['date'],
        description: data.data()!['description'],
        access: data.data()!['access'],
        membersAmount: data.data()!['membersAmount'],
        members: data.data()!['members'],
        ownerId: data.data()!['ownerId'],
        place: data.data()!['place'],
      }
    })
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

  deleteEvent(eid: string){
    const eventRef = doc(this.firestore, `events/${eid}`)

    return deleteDoc(eventRef);
  }
}
