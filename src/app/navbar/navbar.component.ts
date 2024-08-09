import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { InputDirective } from '../directives/input.directive';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../services/navigation.service';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    InputDirective,
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  router = inject(Router);
  navigationService = inject(NavigationService);
  searchService = inject(SearchService);

  activePage: string = '';
  searchPhrase: string = '';
  searchPeriod: Date[] = [];

  ngOnInit(): void {
    this.navigationService.activePage.subscribe(page => {
      this.activePage = page
    })
  }

  onLogout(){
    localStorage.removeItem('uid');
    this.router.navigate(['login'])
  }

  onUserPanel(){
    this.activePage = 'user-panel';
    this.router.navigate(['page', 'user-panel']);
  }

  onCalendarPage(){
    this.activePage = 'calendar';
    this.router.navigate(['page', 'calendar']);
  }

  onChangePhrase(){
    this.searchService.setSearchPhrase(this.searchPhrase);
  }

  onChangePeriod(){
    this.searchService.setSearchPeriod(this.searchPeriod);
  }
}
