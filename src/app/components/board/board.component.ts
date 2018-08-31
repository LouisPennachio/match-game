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
   * Work around that allows us to use *ngFor to display the matches.
   * Otherwise *ngFor only works on collections.
   */
  matchesArray = [];

  @ViewChild("matches") matches: ElementRef;

  private gameState: Observable<State>;

  constructor(private store: Store<State>) {
    this.gameState = store.select('game');
    this.gameState.subscribe(state => {
      this.displayMatches(state.matches);
      this.previewMatches(state.matchesToPreview);
    });
  }

  ngOnInit() {
  }

  private displayMatches(matches: number) {
    if (this.matchesArray.length != matches) {
      this.matchesArray = Array(matches);
    }
  }

  private previewMatches(matchesToPreview: number) {
    // We get the HTMLCollection containing all the matches
      let elements = Array.from(document.getElementsByClassName('match'));
      this.applyOpacity(elements, matchesToPreview);
  }

  private applyOpacity(elements: any[], matchesToPreview: number) {
    let matches = elements.length;
    elements
      // We select the last N matches (that the player selected)
      .slice(Math.max(0, matches - MAX_NUMBER_OF_MATCHES_REMOVED), matches)
      // We will process them from right to left
      .reverse()
      // We apply the opacity on the selected matches, and restore it on the unselected matches
      .map((element, index) => {
        if (index + 1 <= matchesToPreview) {
          this.addOpacityToMatch(element);
        } else {
          this.removeOpacityFromMatch(element);
        }
      });
  }
  
  private addOpacityToMatch(match: any) {
    match.classList.add('transparent-match');
  }

  private removeOpacityFromMatch(match: any) {
    match.classList.remove('transparent-match');
  }
}
