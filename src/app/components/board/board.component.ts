import { State } from './../../reducers/game';
import { Observable, Subscription } from 'rxjs';
import { MAX_NUMBER_OF_MATCHES_REMOVED } from './../../shared/constants';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnDestroy {

  /**
   * Allows us to use *ngFor to display the matches.
   * Otherwise *ngFor only works on collections.
   * 
   * This is also used to tell if a match should be rendered with some transparency.
   */
  public matchesArray: boolean[] = [];

  @ViewChild("matches") matches: ElementRef;

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

  private onNewState(state: State): void {
    let matches = state.matches;
    let matchesToPreview = state.matchesToPreview;

    // If the number of matches to display has changed, we render the matches
    if (this.matchesArray.length != matches) {
      this.matchesArray = Array(matches);
    }

    // Transparency update (removal)
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
  public shouldBeTransparent(index: number): boolean {
    return this.matchesArray[index];
  }
}
