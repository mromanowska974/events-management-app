import { Component, ElementRef, inject, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
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

  sub: Subscription;

  event: Event;
  activeUser: User;
  allUsers: User[];
  usersList: User[];
  searchPhrase: string;
  selectedUserIndex: number;
  selectedUser: User;

  ngOnInit(): void {
      this.navigationService.setActivePage('details');
      this.event = JSON.parse(localStorage.getItem('event')!);

      this.sub = this.userService.activeUser.subscribe(user => {
        this.activeUser = user!
        this.userService.getAllUsers().then(users => {
          this.allUsers = users.filter(user => user.uid !== this.activeUser.uid);
          this.usersList = this.allUsers.slice();
        })
      })      
  }

  ngOnDestroy(): void {
      if(this.sub){
        this.sub.unsubscribe();
      }
  }

  onEditEvent() {
    this.router.navigate(['edit-event']);
  }

  onInviteUser(template) {
    this.modalService.openModal(this.modalRef, template);
  }

  onCloseModal(){
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
    this.invitationService.sendInvitation(this.activeUser, this.event, this.selectedUser.uid);
    this.onCloseModal();
  }

  onSendRequest(){
    this.requestService.sendRequest(this.activeUser, this.event);
    alert('Prośba o dołączenie została wysłana.');
  }
}
