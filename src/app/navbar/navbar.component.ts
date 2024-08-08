import { Component, inject, OnInit } from '@angular/core';
import { InputDirective } from '../directives/input.directive';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    InputDirective,
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  router = inject(Router);
  navigationService = inject(NavigationService);

  activePage: string = '';

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
}
