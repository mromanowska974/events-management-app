import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { InputDirective } from '../directives/input.directive';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../services/navigation.service';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from 'rxjs';
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
  activeUser$: Observable<User>;
  isMenuActive: boolean = false;

  navigationSub: Subscription;

  ngOnInit(): void {
    this.navigationSub = this.navigationService.activePage.subscribe(page => {
      this.activePage = page
    })

    this.activeUser$ = this.userService.activeUser$.asObservable();
  }

  ngOnDestroy(): void {
      if(this.navigationSub) this.navigationSub.unsubscribe();
  }

  onLogout(){
    localStorage.removeItem('uid');
    this.router.navigate(['login'])
  }

  onSwitchPage(pageName: string){
    this.activePage = pageName;
    this.isMenuActive = false;
    this.router.navigate(['page', pageName]);
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
