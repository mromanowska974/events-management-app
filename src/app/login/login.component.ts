import { Component, inject } from '@angular/core';
import { ButtonDirective } from '../directives/button.directive';
import { InputDirective } from '../directives/input.directive';
import { WidgetDirective } from '../directives/widget.directive';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { ContainerDirective } from '../directives/container.directive';
import { NotificationService } from '../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonDirective,
    InputDirective,
    WidgetDirective,
    ContainerDirective,

    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);
  loginService = inject(LoginService);
  userService = inject(UserService);
  notificationService = inject(NotificationService);

  errorMsg: string = '';

  onLogin(email: string, password: string){
    this.loginService.login(email, password).then(data => {
      this.userService.getUser(data.uid).then(user => {
        this.notificationService.getNotifications(user.uid).then(notifs => {
          user.notifications = notifs;
          this.setActiveUser(user);
        })
      })     
    }).catch(error => {
      this.handleError(error)
    })
  }

  onRegister(email: string, password: string){
    this.loginService.register(email, password).then(data => {
      this.userService.createUser(data.uid, data.email!).then(() => {
        this.userService.getUser(data.uid).then(user => {
          this.setActiveUser(user); 
        })   
      })
    }).catch(error => {
      this.handleError(error);
    })
  }

  onResetPassword(email: string){
    this.loginService.resetPassword(email).then(() => {
      alert('Wiadomość z resetem hasła została wysłana na twój adres e-mail.')
    }).catch(err => {
      this.errorMsg = 'Proszę najpierw podać adres e-mail.'
    })
  }

  onGoogleLogin(){
    this.loginService.googleLogin().then(data => {
      this.handleAlternativeLogin(data);
    })
  }

  onFBLogin(){
    this.loginService.facebookLogin().then(data => {
      this.handleAlternativeLogin(data);
    })
  }

  private handleAlternativeLogin(data: any){
    this.userService.getUser(data.uid).then(user => {
      if(user !== null && user !== undefined){
        this.notificationService.getNotifications(user.uid).then(notifs => {
          user.notifications = notifs;
          this.setActiveUser(user);
        })
      }
      else{
        this.userService.createUser(data.uid, data.email).then(() => {
          this.userService.getUser(data.uid).then(user => {
            this.setActiveUser(user);
          })
        })
      }
    })
  }

  private setActiveUser(user: any){
    this.userService.setActiveUser(user);
    localStorage.setItem('uid', user.uid);
    this.router.navigate(['page', 'main-page']);
  }

  private handleError(error){
    switch(error.code){
      case 'auth/invalid-email':
        this.errorMsg = 'Proszę podać e-mail';
        break;
      case 'auth/invalid-credential':
        this.errorMsg = 'Nieprawidłowe dane logowania';
        break;
      case 'auth/email-already-in-use':
        this.errorMsg = 'E-mail jest już zarejestrowany';
        break;
      case 'auth/missing-password':
        this.errorMsg = 'Proszę podać hasło';
        break;
      default:
        this.errorMsg = 'Nie można zalogować'
    }
  }
}
