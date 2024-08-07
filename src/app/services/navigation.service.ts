import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  activePage = new BehaviorSubject<string>('main-page');

  setActivePage(page: string){
    this.activePage.next(page)
  }
}
