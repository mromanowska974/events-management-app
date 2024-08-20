import { Component, inject } from '@angular/core';
import { ContainerDirective } from '../directives/container.directive';
import { WidgetDirective } from '../directives/widget.directive';
import { ButtonDirective } from '../directives/button.directive';
import { CommonModule } from '@angular/common';
import { getDownloadURL, ref, Storage, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { concatMap } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ContainerDirective,
    WidgetDirective,
    ButtonDirective,

    CommonModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  storage = inject(Storage);
  userService = inject(UserService);
  uploadService = inject(UploadService);
  loginService = inject(LoginService)

  profileImgUrl: string = '';

  onUploadFile(event: any){
    const file: File = event.target.files[0];
    const path: string = `images/profiles/${localStorage.getItem('uid')}`
    
    console.log(file)
    this.uploadService.uploadImage(file, path).pipe(
      concatMap(photoURL => {
        this.profileImgUrl = photoURL;
        return this.userService.modifyUserData(localStorage.getItem('uid'), 'profileImageUrl', photoURL);
      })
    ).subscribe()
  }
}
