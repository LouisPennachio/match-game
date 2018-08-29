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

  @ViewChild("matches") matches;

  constructor(private gameService: GameService) {
    gameService.matches.subscribe(matches => {
      this.matchesArray = Array(matches);
    });

    gameService.preview.subscribe(preview => {
      let numberOfMatches = this.matches.length;
      this.addOpacityToMatch.apply(null, this.matches.nativeElement.children.slice(numberOfMatches, numberOfMatches - preview));
    });
  }

  ngOnInit() {
  }

  private addOpacityToMatch(match: any) {
    match.classList.add('transparent-match');
  }
}
