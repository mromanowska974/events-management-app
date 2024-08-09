import { Component, inject } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { EventCardComponent } from "../event-card/event-card.component";
import { ContainerDirective } from '../directives/container.directive';
import { EventService } from '../services/event.service';
import { CommonModule } from '@angular/common';
import { Event } from '../models/event';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [
    EventCardComponent,
    ContainerDirective,

    CommonModule
  ],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css'
})
export class UserPanelComponent {
  navigationService = inject(NavigationService);
  eventService = inject(EventService);

  ownedEvents: Event[] = [];
  participatedEvents: Event[] = [];
  
  ngOnInit(): void {
    this.navigationService.setActivePage('user-panel')

    this.eventService.getEventsByOwnerId(localStorage.getItem('uid')!).then(events => {
      this.ownedEvents = events;
    })

    this.eventService.getEventsByMemberId(localStorage.getItem('uid')!).then(events => {
      this.participatedEvents = events;
    })
  }
}
