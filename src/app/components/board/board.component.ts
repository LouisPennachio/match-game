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
      this.onNewState(state);
    });
  }

  ngOnInit() {
  }

  onNewState(state: State) {
    this.displayMatches(state.matches);
    this.previewMatches(state.matchesToPreview);
  }

  private displayMatches(matches: number) {
    if (this.matchesArray.length != matches) {
      this.matchesArray = Array(matches);
    }
  }

  private previewMatches(matchesToPreview: number) {
    this.updateOpacity(this.getMatchesElements(), matchesToPreview);
  }

  /**
   * @returns The HTMLCollection containing all the matches
   */
  private getMatchesElements(): Element[] {
    return Array.from(document.getElementsByClassName('match'));
  }

  /**
   * @returns: The matches that could be take by the player this turn
   */
  private getPlayableMatches(elements: Element[]): Element[] {
    let matches = elements.length;
    return elements
      // We select the last N matches (that the player can select)
      .slice(Math.max(0, matches - MAX_NUMBER_OF_MATCHES_REMOVED), matches)
      // By design, the player takes matches from right to left, thus we reverse the order, so that the match at index 0 is the first match that the player can take
      .reverse();
  }

  /**
   * Applies/Removes opacity on the matches that could be taken by the player,
   * according to how many matches he wants to take.
   * 
   * @param elements All the matches that could be opacified
   * @param matchesToPreview The number of matches to add opacity on
   */
  private updateOpacity(elements: any[], matchesToPreview: number) {
    this.getPlayableMatches(elements)
      // We apply the opacity on the selected matches, and restore it on the unselected matches
      .map((element, index) => {
        if (this.shouldOpacifyMatch(index, matchesToPreview)) {
          if (!this.isOpacified(element)) {
            this.addOpacityToMatch(element);
          }
        } else {
          if (this.isOpacified(element)) {
            this.removeOpacityFromMatch(element);
          }
        }
      });
  }

  /**
   * Determines if a playable match should be opacified.
   *
   * @returns true if it should be opacified, false otherwise
   */
  private shouldOpacifyMatch(index: number, matchesToPreview: number) {
    return index + 1 <= matchesToPreview;
  }

  /**
   * Adds opacity to a match.
   * 
   * @param match the DOM element corresponding to the match
   */
  private addOpacityToMatch(match: any) {
    match.classList.add('transparent-match');
  }

  /**
   * Removes opacity from a match.
   * 
   * @param match the DOM element corresponding to the match
   */
  private removeOpacityFromMatch(match: any) {
    match.classList.remove('transparent-match');
  }

  /**
   * @returns: true if the match is opacified, false otherwise
   */
  private isOpacified(match: any) {
    return match.classList.contains('transparent-match');
  }
}
