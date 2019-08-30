import { INIT } from './../../actions/game';
import { MAX_NUMBER_OF_MATCHES_REMOVED } from './../../shared/constants';
import { Store } from '@ngrx/store';
import { PREVIEW, TAKE } from './../../actions/matches';
import { State } from './../../reducers/game';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnDestroy {
  /**
   * Defines how many matches (max) can be removed this turn.
   */
  public numberOfRemovableMatches: number;

  /**
   * Flag that tells if the game has ended.
   */
  public gameEnded: boolean;

  /**
   * Holds the current subscriptions.
   */
  private subscription: Subscription;

  constructor(private store: Store<State>) {
    this.subscription = store.select('game').subscribe(state => {
      this.onNewState(state);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private onNewState(state: State) {
    this.numberOfRemovableMatches = this.getNumberOfRemovableMatches(state.matches);
    this.gameEnded = state.gameEnded;
  }

  /**
   * Dispatches a preview event.
   * 
   * @param matches The number of matches to preview.
   */
  public preview(matches: number): void {
    this.store.dispatch({ type: PREVIEW, payload: matches });
  }

  /**
   * Dispatches an end turn event.
   */
  public endTurn(): void {
    this.store.dispatch({ type: TAKE });
  }

  /**
  * Dispatches a restart game event.
  */
  public restartGame(): void {
    this.store.dispatch({ type: INIT });
  }

  /**
   * Returns the max amount of matches that can be removed this turn, depending on how many matches are in game.
   * For example, if only 2 matches are remaining, we don't want to allow the user to remove 3.
   */
  private getNumberOfRemovableMatches(numberOfMatches: number): number {
    return numberOfMatches >= MAX_NUMBER_OF_MATCHES_REMOVED ? MAX_NUMBER_OF_MATCHES_REMOVED : numberOfMatches;
  }
}
