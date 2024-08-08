import { Component, inject, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { ContainerDirective } from '../directives/container.directive';
import { WidgetDirective } from '../directives/widget.directive';
import { ButtonDirective } from '../directives/button.directive';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    ContainerDirective,
    WidgetDirective,
    ButtonDirective,

    CommonModule
  ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit{
  navigationService = inject(NavigationService);
  router = inject(Router);

  event: any;
  uid: string = '';

  ngOnInit(): void {
      this.navigationService.setActivePage('details')
      this.event = JSON.parse(localStorage.getItem('event')!)
      this.uid = localStorage.getItem('uid')!;
      console.log(this.event)
  }

  onEditEvent() {
    this.router.navigate(['edit-event'])
  }
}
