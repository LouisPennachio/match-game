import { GameService } from './../shared/game/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private gameService: GameService) {}

  ngOnInit() {
  }

}
