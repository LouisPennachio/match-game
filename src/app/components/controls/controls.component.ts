import { INIT } from './../../actions/game';
import { MAX_NUMBER_OF_MATCHES_REMOVED } from './../../shared/constants';
import { Store } from '@ngrx/store';
import { PREVIEW, TAKE } from './../../actions/matches';
import { State } from './../../reducers/game';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  /**
   * Defines how many matches (max) can be removed this turn.
   */
  numberOfRemovableMatches: number;

  gameEnded: boolean; 

  private gameState: Observable<State>;

  constructor(private store: Store<State>) {
    this.gameState = store.select('game');
    this.gameState.subscribe(state => {
      this.numberOfRemovableMatches = this.getNumberOfRemovableMatches(state.matches);
      this.gameEnded = state.gameEnded;
    });
  }

  ngOnInit() {
  }

  preview(matches: number) {
    this.store.dispatch({type: PREVIEW, payload: matches});
  }

  endTurn() {
    this.store.dispatch({type: TAKE});
  }

  restartGame() {
    this.store.dispatch({type: INIT});
  }

  /**
   * Returns the max amount of matches that can be removed this turn, depending on how many matches are in game.
   * For example, if only 2 matches are remaining, we don't want to allow the user to remove 3.
   */
  private getNumberOfRemovableMatches(numberOfMatches: number) {
    return numberOfMatches >= MAX_NUMBER_OF_MATCHES_REMOVED ? MAX_NUMBER_OF_MATCHES_REMOVED : numberOfMatches;
  }
}
