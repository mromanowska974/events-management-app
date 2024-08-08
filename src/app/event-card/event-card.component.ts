import { Component, inject, Input } from '@angular/core';
import { WidgetDirective } from '../directives/widget.directive';
import { ButtonDirective } from '../directives/button.directive';
import { Router } from '@angular/router';

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

  @Input() event: any;

  onOpenDetails(){
    localStorage.setItem('event', JSON.stringify(this.event))
    this.router.navigate(['page', 'details'])
  }
}
