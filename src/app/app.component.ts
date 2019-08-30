import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from './reducers/game';
import { INIT } from './actions/game';
import { Component, OnDestroy } from '@angular/core';

/**
 * AppComponent coordinates the components of the game.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  /**
   * The current game state.
   */
  public state: State;

  /**
   * Holds the current subscriptions.
   */
  private subscription: Subscription;

  constructor(private store: Store<State>) {
    // We subscribe to the game observable to monitor the game state.
    this.subscription = store.select('game').subscribe(state => {
      if (state != null) {
        this.state = state;
        console.log(JSON.stringify(this.state));
      }
    });

    // We start the game !
    this.initGame();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Will dispatch the INIT event to the game reducer.
   */
  private initGame() {
    this.store.dispatch({ type: INIT });
  }
}
