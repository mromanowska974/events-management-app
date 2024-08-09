import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchPhrase = new BehaviorSubject<string>('');
  searchPeriod = new BehaviorSubject<Date[]>([])

  setSearchPhrase(phrase: string){
    this.searchPhrase.next(phrase);
  }

  setSearchPeriod(timeRange: Date[]){
    this.searchPeriod.next(timeRange)
  }
}
