import { Component, Input } from '@angular/core';
import { WidgetDirective } from '../directives/widget.directive';
import { ButtonDirective } from '../directives/button.directive';

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
  @Input() event: any;
}
