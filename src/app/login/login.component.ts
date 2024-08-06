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
      this.userService.getUser(data.uid).then(user => {
        this.setActiveUser(data.uid, user); 
      })     
    }).catch(error => {
      console.log(error)
    })
  }

  onRegister(email: string, password: string){
    this.loginService.register(email, password).then(data => {
      this.userService.createUser(data.uid, data.email).then(() => {
        this.userService.getUser(data.uid).then(user => {
          this.setActiveUser(data.uid, user); 
        })   
      })
    }).catch(error => {
      console.log(error)
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
    console.log(data)
    this.userService.getUser(data.uid).then(user => {
      console.log(user)
      if(user !== null && user !== undefined){
        this.setActiveUser(data.uid, user)
      }
      else{
        this.userService.createUser(data.uid, data.email).then(() => {
          this.userService.getUser(data.uid).then(user => {
            this.setActiveUser(data.uid, user)
          })
        })
      }
    })
  }

  private setActiveUser(uid: string, user: any){
    this.userService.setActiveUser(user)
    localStorage.setItem('uid', uid)
    this.router.navigate(['main-page'])
  }
}
