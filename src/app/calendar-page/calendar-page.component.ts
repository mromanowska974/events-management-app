import { Component, inject, OnInit } from '@angular/core';
import { CalendarComponent } from "../calendar/calendar.component";
import { NavigationService } from '../services/navigation.service';
import { ContainerDirective } from '../directives/container.directive';
import { WidgetDirective } from '../directives/widget.directive';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';
import { DateTime } from 'luxon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CalendarComponent,
    ContainerDirective,
    WidgetDirective,

    CommonModule
  ],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.css'
})
export class CalendarPageComponent implements OnInit{
  navigationService = inject(NavigationService);
  eventService = inject(EventService);

  ownedEvents: Event[] = [];
  participatedEvents: Event[] = [];

  ownedEventsByDate: Event[] = [];
  participatedEventsByDate: Event[] = [];

  selectedDate: DateTime = DateTime.local();

  ngOnInit(): void {
    this.navigationService.setActivePage('calendar')

    this.eventService.getEventsByOwnerId(localStorage.getItem('uid')!).then(events => {
      this.ownedEvents = events;
    })
  
    this.eventService.getEventsByMemberId(localStorage.getItem('uid')!).then(events => {
      this.participatedEvents = events;
    })
  }

  onDateReceived(date: DateTime){
    this.participatedEventsByDate = this.participatedEvents.slice();
    this.ownedEventsByDate = this.ownedEvents.slice();
    this.selectedDate = date;

    this.ownedEventsByDate = this.ownedEvents.filter(event => event.date.toString() === this.selectedDate.toISODate())
    this.participatedEventsByDate = this.participatedEvents.filter(event => event.date.toString() === this.selectedDate.toISODate())
  }
}
