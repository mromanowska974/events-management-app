import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { InputDirective } from '../directives/input.directive';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../services/navigation.service';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { WidgetDirective } from '../directives/widget.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    InputDirective,
    CommonModule,
    WidgetDirective,
    RouterLink,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy{
  router = inject(Router);
  navigationService = inject(NavigationService);
  searchService = inject(SearchService);
  userService = inject(UserService);

  activePage: string = '';
  searchPhrase: string = '';
  searchPeriod: Date[] = [];
  activeUser: User;
  isMenuActive: boolean = false;

  navigationSub: Subscription;
  userSub: Subscription;

  ngOnInit(): void {
    this.navigationService.activePage.subscribe(page => {
      this.activePage = page
    })

    this.userService.activeUser.subscribe(user => {
      if (user) this.activeUser = user;
    })
  }

  ngOnDestroy(): void {
      if(this.navigationSub) this.navigationSub.unsubscribe();
      if(this.userSub) this.userSub.unsubscribe()
  }

  onLogout(){
    localStorage.removeItem('uid');
    this.router.navigate(['login'])
  }

  onUserPanel(){
    this.activePage = 'user-panel';
    this.isMenuActive = false;
    this.router.navigate(['page', 'user-panel']);
  }

  onCalendarPage(){
    this.activePage = 'calendar';
    this.isMenuActive = false;
    this.router.navigate(['page', 'calendar']);
  }

  onNotificationPage(){
    this.activePage = 'notifications';
    this.isMenuActive = false;
    this.router.navigate(['page', 'notifications'])
  }

  onSettingsPanel(){
    this.router.navigate(['settings']);
  }

  onChangePhrase(){
    this.searchService.setSearchPhrase(this.searchPhrase);
  }

  onChangePeriod(){
    this.searchService.setSearchPeriod(this.searchPeriod);
  }

  onDisplayMenu(){
    this.isMenuActive = !this.isMenuActive;
  }
}
