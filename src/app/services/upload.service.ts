import { inject, Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private storage = inject(Storage);

  uploadImage(image: File, path: string){
    const storageRef = ref(this.storage, path)
    const uploadTask = from(uploadBytes(storageRef, image));

    return uploadTask.pipe(
      switchMap((result) => getDownloadURL(result.ref))
    )
  }
}
