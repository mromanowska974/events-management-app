import { Component } from '@angular/core';
import { InputDirective } from '../directives/input.directive';

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

}
