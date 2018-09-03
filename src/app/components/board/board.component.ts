import { State } from './../../reducers/game';
import { Observable } from 'rxjs';
import { MAX_NUMBER_OF_MATCHES_REMOVED } from './../../shared/constants';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  /**
   * Allows us to use *ngFor to display the matches.
   * Otherwise *ngFor only works on collections.
   * 
   * This is also used to tell if a match should be rendered with some transparency.
   */
  matchesArray: boolean[] = [];

  @ViewChild("matches") matches: ElementRef;

  private gameState: Observable<State>;

  constructor(private store: Store<State>) {
    this.gameState = store.select('game');
    this.gameState.subscribe(state => {
      this.onNewState(state);
    });
  }

  ngOnInit() {
  }

  onNewState(state: State) {
    let matches = state.matches;
    let matchesToPreview = state.matchesToPreview;

    // If the number of matches to display has changed, we render the matches
    if (this.matchesArray.length != matches) {
      this.matchesArray = Array(matches);
    }

    // Transparency update (remvoval)
    for (var i = 0; i < matches - matchesToPreview; i++) {
      this.matchesArray[i] = false;
    }

    // Transparency update (addition)
    for (var j = matches - matchesToPreview; j < matches; j++) {
      this.matchesArray[j] = true;
    }
  }

  /**
   * Tells whether a given match should be rendered with transparency.
   * 
   * @param index the index of the match
   */
  shouldBeTransparent(index: number): boolean {
    return this.matchesArray[index];
  }
}
