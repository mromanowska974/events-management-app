import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ContainerDirective } from '../directives/container.directive';
import { NavigationService } from '../services/navigation.service';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NavbarComponent,
    EventCardComponent,

    ContainerDirective,

    CommonModule
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{
  userService = inject(UserService);
  navigationService = inject(NavigationService);
  eventService = inject(EventService);
  router = inject(Router);

  publicEvents: any[] = [];

  ngOnInit(): void {
    this.userService.activeUser.subscribe(user => {
      console.log(user)
    })

    this.navigationService.setActivePage('main-page');

    this.eventService.getPublicEvents().then(events => {
      this.publicEvents = events;
    })
  }

  onAddEvent(){
    this.router.navigate(['add-event'])
  }
}
