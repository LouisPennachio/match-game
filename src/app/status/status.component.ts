import { GameService } from './../shared/game/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private gameService: GameService) {}

  ngOnInit() {
  }

}
