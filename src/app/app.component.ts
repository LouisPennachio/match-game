import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from './reducers/game';
import { INIT } from './actions/game';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private gameState: Observable<State>;

  gameEnded: boolean;

  constructor(private store: Store<State>) {
    this.gameState = store.select('game');
    this.gameState.subscribe(state => {
      this.gameEnded = state == null || state.gameEnded;
    });
    this.initGame();
  }

  private initGame() {
    this.store.dispatch({type: INIT});
  }
}
