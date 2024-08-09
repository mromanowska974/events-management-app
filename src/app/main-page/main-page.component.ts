import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ContainerDirective } from '../directives/container.directive';
import { NavigationService } from '../services/navigation.service';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { SearchService } from '../services/search.service';

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
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit{
  userService = inject(UserService);
  navigationService = inject(NavigationService);
  eventService = inject(EventService);
  router = inject(Router);
  searchService = inject(SearchService);
  cd = inject(ChangeDetectorRef);

  publicEvents: any[] = [];
  eventsList: any[] = [];
  
  ngOnInit(): void {
    this.userService.activeUser.subscribe(user => {
      console.log(user)
    })

    this.navigationService.setActivePage('main-page');

    this.eventService.getPublicEvents().then(events => {
      this.publicEvents = events;
      
      this.searchService.searchPhrase.subscribe(phrase => {
        this.eventsList = this.publicEvents.slice();
        this.eventsList = this.eventsList.filter(event => event.name.includes(phrase));
      })
    })
  }

  onAddEvent(){
    this.router.navigate(['add-event'])
  }
}
