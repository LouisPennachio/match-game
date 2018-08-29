import { ControlsService } from './../controls/controls.service';
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
  readonly matches: Subject<number> = new ReplaySubject(1);

  /**
   * Emits the number of matches that a player wants to remove before he actually ends his turn.
   */
  readonly preview: Subject<number> = new Subject();

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

  constructor(private statusService: StatusService, private controlsService: ControlsService) {
    this.initGame();
  }

  private initGame() {
    this.currentPlayer = PLAYERS[0];
    this.gameEnded = false;
    this.updateStatus();
    this.numberOfMatches = this.getRandomNumberOfMatches();
    this.updateMatches();
    this.updateControls();
  }

  /**
   * Updates the status bar with the current game state.
   */
  private updateStatus() {
    this.statusService.updateStatus(this.currentPlayer, this.gameEnded);
  }

  /**
   * Updates the matches with the current game states.
   */
  private updateMatches() {
    this.matches.next(this.numberOfMatches);
  }

/**
   * Updates the controls with the current game state.
   */
  private updateControls() {
    this.controlsService.updateControls(this.numberOfMatches);
  }
  /**
   * Returns a random number of matches to fill the board.
   * The number of matches is between {@link MIN_NUMBER_OF_MATCHES} and {@link MIN_NUMBER_OF_MATCHES} + {@link NUMBER_OF_MATCHES_VARIATIONS}
   */
  private getRandomNumberOfMatches() {
    return MIN_NUMBER_OF_MATCHES + Math.ceil(Math.random() * NUMBER_OF_MATCHES_VARIATIONS);
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
