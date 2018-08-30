import { MAX_NUMBER_OF_MATCHES_REMOVED } from './../../shared/constants';
import { element } from 'protractor';
import { GameService } from './../../shared/game/game.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

  constructor(private gameService: GameService) {
    gameService.matches.subscribe(matches => {
      this.matchesArray = Array(matches);
    });

    ngOnInit() {
    }
    
    gameService.previewMatches.subscribe(numberOfRemovedMatches => {
      // We get the HTMLCollection containing all the matches
      let elements = Array.from(document.getElementsByClassName('match'));
      let numberOfMatches = elements.length;
      this.applyOpacity(elements, numberOfMatches, numberOfRemovedMatches);
    });
  }



  private applyOpacity(elements: any[], numberOfMatches: number, numberOfRemovedMatches: number) {
    elements
      // We select the matches that can be selected this turn
      .splice(numberOfMatches - MAX_NUMBER_OF_MATCHES_REMOVED, numberOfMatches)
      // We apply the opacity on the selected matches, and restore it on the unselected matches
      .map((element, index) => {
        if (index < MAX_NUMBER_OF_MATCHES_REMOVED - numberOfRemovedMatches) {
          this.removeOpacityFromMatch(element);
        } else {
          this.addOpacityToMatch(element);
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
