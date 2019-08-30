import { State } from './../../reducers/game';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnDestroy {
  /**
   * The current game status.
   */
  public status: String;

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

  /**
   * Displays a message in the status bar.
   * 
   * If the game is ongoing, the message will tell whose turn it is.
   * Otherwise, the message will tell who won the game.
   * 
   * @param state The current game state.
   */
  onNewState(state: State) {
    if (!state.gameEnded) {
      this.status = `It's ${state.player.name} turn !`;
    } else {
      this.status = `${state.player.name} won !`;
    }
  }
}
