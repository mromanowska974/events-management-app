import { Component, inject } from '@angular/core';
import { ButtonDirective } from '../directives/button.directive';
import { InputDirective } from '../directives/input.directive';
import { WidgetDirective } from '../directives/widget.directive';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

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
  loginService = inject(LoginService);
  userService = inject(UserService);

  onLogin(email: string, password: string){
    this.loginService.login(email, password).then(data => {
      this.setActiveUser(data.user.uid);      
    }).catch(error => {
      console.log(error)
    })
  }

  onRegister(email: string, password: string){
    this.loginService.register(email, password).then(data => {
      this.userService.createUser(data.user.uid, data.user.email).then(() => {
        this.setActiveUser(data.user.uid);
      })
    }).catch(error => {
      console.log(error)
    })
  }

  setActiveUser(uid: string){
    this.userService.getUser(uid).then(user => {
      this.userService.setActiveUser(user)
      localStorage.setItem('uid', uid)
      this.router.navigate(['main-page'])
    })
  }
}
