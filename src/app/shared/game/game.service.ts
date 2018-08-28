import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private status: BehaviorSubject<String> = new BehaviorSubject('kek');

  constructor() {
  }

  removeMatches(numberOfMatches: number) {

  }
}
