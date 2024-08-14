import { Component, inject, Input } from '@angular/core';
import { WidgetDirective } from '../directives/widget.directive';
import { ButtonDirective } from '../directives/button.directive';
import { Router } from '@angular/router';
import { Event } from '../models/event';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [
    WidgetDirective,
    ButtonDirective
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  router = inject(Router);

  @Input() event: Event;

  onOpenDetails(){
    localStorage.setItem('eventId', this.event.id)
    this.router.navigate(['page', 'details'])
  }
}
