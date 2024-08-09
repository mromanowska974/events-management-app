import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchPhrase = new BehaviorSubject<string>('');

  setSearchPhrase(phrase: string){
    this.searchPhrase.next(phrase);
  }
}
