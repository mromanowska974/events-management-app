import { Component, inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { ContainerDirective } from '../directives/container.directive';
import { WidgetDirective } from '../directives/widget.directive';
import { ButtonDirective } from '../directives/button.directive';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Event } from '../models/event';
import { ModalService } from '../services/modal.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { InvitationService } from '../services/invitation.service';
import { Subscription } from 'rxjs';
import { RequestService } from '../services/request.service';
import { EventService } from '../services/event.service';
import { NotificationService } from '../services/notification.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    ContainerDirective,
    WidgetDirective,
    ButtonDirective,

    CommonModule,
    FormsModule
  ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit, OnDestroy{
  @ViewChild('modalRef', {read: ViewContainerRef}) modalRef: ViewContainerRef;

  navigationService = inject(NavigationService);
  modalService = inject(ModalService);
  userService = inject(UserService);
  invitationService = inject(InvitationService);
  requestService = inject(RequestService);
  router = inject(Router);
  eventService = inject(EventService);
  notificationService = inject(NotificationService);
  chatService = inject(ChatService);

  activeUserSub: Subscription;

  event: Event;
  activeUser: User;
  allUsers: User[];
  usersList: User[];
  searchPhrase: string;
  selectedUserIndex: number;
  selectedUser: User;
  members: User[] = [];
  owner: User;
  errorMsg: string = '';

  ngOnInit(): void {
      this.navigationService.setActivePage('details');
      this.eventService.getEvent(localStorage.getItem('eventId')!).then(event => {
        this.event = event;

        this.event.members.forEach(memberId => {
          this.userService.getUser(memberId).then(user => {
            this.members.push(user);
          })
        });

        this.userService.getUser(event.ownerId).then(user => {
          this.owner = user;
        })
      })

      this.activeUserSub = this.userService.activeUser$.subscribe(user => {
        this.activeUser = user!
        this.userService.getAllUsers().then(users => {
          this.allUsers = users.filter(user => user.uid !== this.activeUser.uid);
          this.usersList = this.allUsers.slice();
        })
      })        
  }

  ngOnDestroy(): void {
      if(this.activeUserSub){
        this.activeUserSub.unsubscribe();
      }
  }

  onEditEvent() {
    this.router.navigate(['edit-event']);
  }

  onInviteUser(template) {
    this.modalService.openModal(this.modalRef, template);
  }

  onCloseModal(){
    this.errorMsg = '';
    this.modalService.closeModal(this.modalRef);
  }

  onInputChange(){
    this.usersList = this.allUsers.slice();

    this.usersList = this.usersList.filter(user => user.nickname.includes(this.searchPhrase))
  }

  onSelectUser(user: User, index: number){
    this.selectedUserIndex = index;
    this.selectedUser = user;
  }
  
  onSendInvitation(){
    if(this.selectedUser !== undefined){
      this.invitationService.sendInvitation(this.activeUser, this.event, this.selectedUser.uid);
      this.onCloseModal();
    }
    else {
      this.errorMsg = 'Proszę wybrać użytkownika.'
    }
  }

  onSendRequest(){
    this.requestService.sendRequest(this.activeUser, this.event);
    alert('Prośba o dołączenie została wysłana.');
  }

  onLeaveEvent(){
    let members = this.event.members.filter(member => member !== this.activeUser.uid);
    this.eventService.modifyMembersList(this.event.id, members).then(() => {
      this.notificationService.sendLeavingNotification(this.activeUser, this.event.ownerId, this.event.name);
      this.router.navigate(['page', 'main-page'])
    })
  }

  onRemoveMember(memberId){
    let isSure = confirm('Czy na pewno chcesz usunąć wybranego użytkownika z wydarzenia?');

    if(isSure){
      let members = this.event.members.filter(member => member !== memberId);
      this.eventService.modifyMembersList(this.event.id, members).then(() => {
        this.notificationService.sendRemovingNotification(this.activeUser, memberId, this.event.name);
        window.location.reload()
      })
    }
  }

  onDeleteEvent(){
    let isSure = confirm('Czy na pewno chcesz usunąć wydarzenie? Wszystkie dane zostaną utracone.');

    if(isSure){
      this.eventService.deleteEvent(this.event.id).then(() => {
        this.event.members.forEach(member => {
          this.notificationService.sendDeletedEventNotification(this.activeUser, member, this.event.name);
          this.router.navigate(['page', 'main-page']);
        })
      })
    }
  }

  onStartChat(user: User){
    this.chatService.startChat(user).subscribe();
  }
}
