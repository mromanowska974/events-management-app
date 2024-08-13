import { Component, inject, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { ContainerDirective } from '../directives/container.directive';
import { WidgetDirective } from '../directives/widget.directive';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [
    ContainerDirective,
    WidgetDirective
  ],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.css'
})
export class NotificationPageComponent implements OnInit{
  navigationService = inject(NavigationService);

  ngOnInit(): void {
      this.navigationService.setActivePage('notifications');
  }
}
