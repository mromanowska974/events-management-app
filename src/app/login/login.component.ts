import { Component, inject } from '@angular/core';
import { ButtonDirective } from '../directives/button.directive';
import { InputDirective } from '../directives/input.directive';
import { WidgetDirective } from '../directives/widget.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonDirective,
    InputDirective,
    WidgetDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);

  onLogin(){
    this.router.navigate(['main-page'])
  }
}
