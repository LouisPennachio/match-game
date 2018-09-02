import { By } from '@angular/platform-browser';
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

  describe('status message tests', () => {
    let state: State = {
      gameEnded: false,
      matchesToPreview: 0,
      matches: 0,
      player: PLAYERS[0]
    };

    it('should display whose turn it is when the game is ongoing', () => {
      // We make the game ongoing
      state.gameEnded = false;

      component.onNewState(state);
      fixture.detectChanges();
      
      let status = fixture.debugElement.query(By.css('p'));
      expect(status.nativeElement.innerHTML).toEqual(`It's ${state.player.name} turn !`);
    });

    it('should display who won when the game is over', () => {
      // We make the game to be over
      state.gameEnded = true;

      component.onNewState(state);
      fixture.detectChanges();

      let status = fixture.debugElement.query(By.css('p'));
      expect(status.nativeElement.innerHTML).toEqual(`${state.player.name} won !`);
    });
  });
});
