import { MAX_NUMBER_OF_MATCHES_REMOVED } from './../constants';
import { Subject, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  /**
   * Emits the max number of matches that can be removed this turn.
   */
  readonly removableMatches: Subject<number> = new ReplaySubject(1);

  constructor() { }

  /**
   * Updates the controls with the current number of matches in game.
   * 
   * @param numberOfMatches The current number of matches in game.
   */
  updateControls(numberOfMatches: number) {
    this.removableMatches.next(this.getNumberOfRemovableMatches(numberOfMatches)); 
  }

  /**
   * Returns the max amount of matches that can be removed this turn, depending on how many matches are in game.
   * If 2 matches are remaining, we don't want to allow the user to remove 3.
   */
  getNumberOfRemovableMatches(numberOfMatches: number) {
    return numberOfMatches >= MAX_NUMBER_OF_MATCHES_REMOVED ? MAX_NUMBER_OF_MATCHES_REMOVED : numberOfMatches;
  }
}
