import { State } from './../../reducers/game';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  status: String;

  private gameState: Observable<State>;

  constructor(private store: Store<State>) {
    this.gameState = store.select('game');
    this.gameState.subscribe(state => {
      this.updateStatus(state);
    });
  }

  ngOnInit() {

  }

  /**
   * Displays a message in the status bar.
   * 
   * If the game is ongoing, the message will tell whose turn it is.
   * Otherwise, the message will tell who won the game.
   * 
   * @param state The current game state.
   */
  updateStatus(state: State) {
    if (!state.gameEnded) {
      this.status = `It's ${state.player.name} turn !`;
    } else {
      this.status = `${state.player.name} won !`;
    }
  }
}
