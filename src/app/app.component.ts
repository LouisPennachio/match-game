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
  title = 'match-game';

  constructor(private store: Store<State>) {
    store.dispatch({type: INIT});
  }
}
