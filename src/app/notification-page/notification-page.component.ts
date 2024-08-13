import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { ContainerDirective } from '../directives/container.directive';
import { WidgetDirective } from '../directives/widget.directive';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '../directives/button.directive';
import { InvitationService } from '../services/invitation.service';
import { Subscription } from 'rxjs';
import { EventService } from '../services/event.service';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [
    ContainerDirective,
    WidgetDirective,
    ButtonDirective,

    CommonModule
  ],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.css'
})
export class NotificationPageComponent implements OnInit, OnDestroy{
  navigationService = inject(NavigationService);
  userService = inject(UserService);
  invitationService = inject(InvitationService);
  requestService = inject(RequestService);
  eventService = inject(EventService);

  activeUser: User;

  sub: Subscription;

  ngOnInit(): void {
      this.navigationService.setActivePage('notifications');

      this.sub = this.userService.activeUser.subscribe(user => {
        this.activeUser = user!

        console.log(this.activeUser)
      })
  }

  ngOnDestroy(): void {
      if(this.sub){
        this.sub.unsubscribe();
      }
  }

  onAcceptNotification(uid, notifId, eid, type){
    if(type === 'invitation'){
      this.invitationService.acceptInvitation(this.activeUser, uid);
    }
    else if(type === 'request') {
      this.requestService.acceptRequest(this.activeUser, uid);
    }
    
    this.eventService.getEvent(eid).then(event => {
      console.log(event)
      if(type === 'invitation'){
        event.members.push(this.activeUser.uid);
      }
      else if(type === 'request'){
        event.members.push(uid);
      }
      this.eventService.modifyMembersList(eid, event.members);
    })

    this.onReadNotification(notifId);
  }

  onDeclineNotification(uid, notifId, type){
    if(type === 'invitation'){
      this.invitationService.declineInvitation(this.activeUser, uid);
    }
    else if(type === 'request'){
      this.requestService.declineRequest(this.activeUser, uid);
    }
    this.onReadNotification(notifId);
  }

  onReadNotification(id){
    let notifications = this.activeUser.notifications.filter(notif => notif.id !== id);
    this.userService.readNotification(id, this.activeUser.uid);
    this.userService.setActiveUser({
      ...this.activeUser,
      notifications: notifications
    })
  }
}
