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
import { Event } from '../models/event';
import { combineLatest, map, Observable, startWith } from 'rxjs';

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

  publicEvents: Event[] = [];
  eventsList: Event[] = [];

  eventsList$: Observable<Event[]>;
  
  ngOnInit(): void {
    this.navigationService.setActivePage('main-page');

    this.eventsList$ = combineLatest([
      this.eventService.getPublicEvents(),
      this.searchService.searchPhrase$.asObservable(),
      this.searchService.searchPeriod$.asObservable()
    ]).pipe(
      map(([events, searchPhrase, searchPeriod]) => {
        return (
          (
            searchPhrase ? events.filter(event => event.name.toLowerCase().includes(searchPhrase.toLowerCase())) : events
            &&
            (
              searchPeriod[0] && searchPeriod[1] 
                ? events.filter(event => event.date > searchPeriod[0] && event.date < searchPeriod[1])
                : (
                    (!searchPeriod[0] && searchPeriod[1]) 
                      ? events.filter(event => event.date < searchPeriod[1]) 
                      : (searchPeriod[0] && !searchPeriod[1]) ? events.filter(event => event.date > searchPeriod[0]) : events
                  )
            )
        ))
      })
    )
  }

  onAddEvent(){
    this.router.navigate(['add-event'])
  }
}
