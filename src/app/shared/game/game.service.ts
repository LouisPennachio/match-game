import { StatusService } from './../status/status.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { NUMBER_OF_MATCHES_VARIATIONS, MIN_NUMBER_OF_MATCHES, MAX_NUMBER_OF_MATCHES_REMOVED, PLAYERS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  /**
   * Emits the current number of matches in game.
   */
  private matches: Subject<number> = new ReplaySubject(1);

  /**
   * The current number of matches in game.
   */
  private numberOfMatches: number;

  /**
   * The player that should make a move.
   */
  private currentPlayer: String;

  /**
   * Will be set to false when all the matches will be removed.
   */
  private gameEnded: boolean;

  constructor(private statusService: StatusService) {
    this.initGame();
  }

  private initGame() {
    this.currentPlayer = PLAYERS[0];
    this.gameEnded = false;
    this.updateStatus();
    this.numberOfMatches = this.getRandomNumberOfMatches();
    this.updateMatches();
  }

  /**
   * Updates the status bar with the current game status.
   */
  private updateStatus() {
    this.statusService.updateStatus(this.currentPlayer, this.gameEnded);
  }

  /**
   * Updates the matches with the current game status.
   */
  private updateMatches() {
    this.matches.next(this.numberOfMatches);
  }

  /**
   * Returns a random number of matches to fill the board.
   * The number of matches is between {@link MIN_NUMBER_OF_MATCHES} and {@link MIN_NUMBER_OF_MATCHES} + {@link NUMBER_OF_MATCHES_VARIATIONS}
   */
  private getRandomNumberOfMatches() {
    return MIN_NUMBER_OF_MATCHES + Math.ceil(Math.random() * NUMBER_OF_MATCHES_VARIATIONS);
  }

  /**
   * Returns the max amount of matches that can be removed this turn.
   */
  getNumberOfRemovableMatches() {
    return this.numberOfMatches >= MAX_NUMBER_OF_MATCHES_REMOVED ? MAX_NUMBER_OF_MATCHES_REMOVED : this.numberOfMatches;
  }

  /**
   * Updates the game state with a player action.
   * 
   * @param toRemove the number of matches to remove this turn.
   * @returns the number of matches removed
   */
  removeMatches(toRemove: number) {
    if (this.numberOfMatches < toRemove) {
      return 0;
    } else {
      this.numberOfMatches -= toRemove;
      return toRemove;
    }
  }

  restartGame() {
    this.initGame();
  }
}
