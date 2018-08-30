import { PREVIEW, TAKE } from './../../actions/matches';
import { State } from './../../reducers/game';
import { Observable } from 'rxjs';
import { ControlsService } from './../../shared/controls/controls.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  private gameState: Observable<State>;

  constructor(private store: Store<State>) {
    this.gameState = store.select('game');
    this.gameState.subscribe(state => {
      
    });
  }

  ngOnInit() {
  }

  private displayPreviewButtons(matches: number) {
    
  }

  preview(matches: number) {
    this.store.dispatch({type: PREVIEW, payload: matches});
  }

  endTurn() {
    this.store.dispatch({type: TAKE});
  }
}
