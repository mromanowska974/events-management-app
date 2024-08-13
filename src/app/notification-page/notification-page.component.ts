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

  onAcceptInvitation(uid, notifId, eid){
    this.invitationService.acceptInvitation(this.activeUser, uid);

    this.eventService.getEvent(eid).then(event => {
      console.log(event)
      event.members.push(this.activeUser.uid);
      this.eventService.addMember(eid, event.members);
    })


    this.onReadNotification(notifId);
  }

  onDeclineInvitation(uid, notifId){
    this.invitationService.declineInvitation(this.activeUser, uid);
    this.userService.readNotification(notifId, this.activeUser.uid);

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
