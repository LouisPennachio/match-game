import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from './reducers/game';
import { INIT } from './actions/game';
import { Component } from '@angular/core';

/**
 * AppComponent coordinates the components of the game.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Observable that emits the game state.
   */
  private gameState: Observable<State>;

  /**
   * Flag telling if the game is ended or not.
   */
  gameEnded: boolean;

  constructor(private store: Store<State>) {
    // We retrieve the game stat observable.
    this.gameState = store.select('game');

    // We subscribe to the game observable to monitor the game state.
    this.gameState.subscribe(state => {
      this.gameEnded = state.gameEnded;
    });

    // We start the game !
    this.initGame();
  }

  /**
   * Will dispatch the INIT event to the game reducer.
   */
  private initGame() {
    this.store.dispatch({type: INIT});
  }
}
