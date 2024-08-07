import { Component, inject } from '@angular/core';
import { InputDirective } from '../directives/input.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    InputDirective
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  router = inject(Router);

  onLogout(){
    localStorage.removeItem('uid');
    this.router.navigate(['login'])
  }
}
