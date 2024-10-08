import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { user } from '@angular/fire/auth';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'events-management-app';

  userService = inject(UserService);
  notificationService = inject(NotificationService);

  ngOnInit(): void {
    if(localStorage.getItem('uid') !== null){
      this.userService.getUser(localStorage.getItem('uid')!).then(user => {
        this.notificationService.getNotifications(user.uid).then(notifs => {
          user.notifications = notifs
          this.userService.setActiveUser(user)
        })
      })
    }
  }
}
