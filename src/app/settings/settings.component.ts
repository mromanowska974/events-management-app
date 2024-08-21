import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ContainerDirective } from '../directives/container.directive';
import { WidgetDirective } from '../directives/widget.directive';
import { ButtonDirective } from '../directives/button.directive';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { concatMap, Subscription } from 'rxjs';
import { NavigationService } from '../services/navigation.service';
import { User } from '../models/user';
import { InputDirective } from '../directives/input.directive';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ContainerDirective,
    WidgetDirective,
    ButtonDirective,
    InputDirective,

    CommonModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit, OnDestroy{
  private userService = inject(UserService);
  private uploadService = inject(UploadService);
  private navigationService = inject(NavigationService);
  private loginService = inject(LoginService);

  profileImgUrl: string = '';
  activeUser: User;
  provider: string;

  sub: Subscription;

  ngOnInit(): void {
      this.navigationService.setActivePage('settings');

      this.sub = this.userService.activeUser$.subscribe(user => {
        if(user) {
          this.activeUser = user;
          this.profileImgUrl = this.activeUser.profileImageUrl;

          this.checkProvider()?.then(provider => {
            if(provider) this.provider = provider;
            console.log(this.provider);
          })
        }
      })
  }

  ngOnDestroy(): void {
      if(this.sub) this.sub.unsubscribe();
  }

  onUploadFile(event: any){
    const file: File = event.target.files[0];
    const path: string = `images/profiles/${localStorage.getItem('uid')}`
    
    console.log(file)
    this.uploadService.uploadImage(file, path).pipe(
      concatMap(photoURL => {
        this.profileImgUrl = photoURL;
        return this.userService.modifyUserData(localStorage.getItem('uid'), 'profileImageUrl', photoURL);
      })
    ).subscribe(() => {
      window.location.reload();
    })
  }

  onDeleteAccount(){
    const isSure = confirm('Jesteś pewien, że chcesz usunąć konto? Akcji nie można cofnąć.')
  }

  onChangeNickname(nickname){
    this.userService.modifyUserData(this.activeUser.uid, 'nickname', nickname).then(() => {
      window.location.reload();
    });
  }

  onChangeEmail(newEmail: string, password: string){
    this.loginService.changeEmail(newEmail, password).then(() => {
      this.userService.modifyUserData(this.activeUser.uid, 'email', newEmail).then(() => {
        window.location.reload();
      });
    });
  }

  onChangePassword(oldValue: string, newValue: string){
    this.loginService.changePassword(oldValue, newValue).then(() => {
      window.location.reload();
    }).catch(err => console.log(err))
  }

  private checkProvider(){
    return this.loginService.checkProvider();
  }
}
