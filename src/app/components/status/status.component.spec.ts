import { PLAYERS } from './../../shared/constants';
import { State } from './../../reducers/game';
import { StoreModule } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusComponent } from './status.component';
import { gameReducer } from '../../reducers/game';
import { Player } from '../../model/player';

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusComponent],
      imports: [
        StoreModule.forRoot({ game: gameReducer })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('status message tests', () => {
    let player: Player = PLAYERS[0];

    let state: State = {
      gameEnded: false,
      matchesToPreview: 0,
      matches: 0,
      player: player
    };

    it('should display whose turn it is when the game is ongoing', () => {
      state.gameEnded = false;
      component.updateStatus(state);
      expect(component.status === `It's ${state.player.name} turn !`).toBe(true);
    });

    it('should display who won when the game is over', () => {
      state.gameEnded = true;
      component.updateStatus(state);
      expect(component.status === `${state.player.name} won !`).toBe(true);
    });
  });
});
