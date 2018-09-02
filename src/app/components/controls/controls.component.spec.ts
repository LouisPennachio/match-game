import { PLAYERS, MAX_NUMBER_OF_MATCHES_REMOVED, MAX_NUMBER_OF_MATCHES } from './../../shared/constants';
import { State } from './../../reducers/game';
import { StoreModule } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsComponent } from './controls.component';
import { gameReducer } from '../../reducers/game';
import { By } from '@angular/platform-browser';

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlsComponent],
      imports: [
        StoreModule.forRoot({ game: gameReducer })
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should allow the player to preview the proper number of matches', () => {
    // With a configuration of 3 matches MAX removed every turn:
    // If zero match are in game, the player should not be able to preview any match
    // If one matches is in game, the player should be able to preview one match
    // If two matches are in game, the player should be able to preview two matches
    // If three or more matches are in game, the player should be able to preview three matches

    for (var i = 0; i <= MAX_NUMBER_OF_MATCHES + 1; i++) {
      let state: State = {
        gameEnded: false,
        matchesToPreview: 0,
        matches: i,
        player: PLAYERS[0]
      };

      (component as any).onNewState(state);
      fixture.detectChanges();

      let numberOfMatchesThatCanBePreviewd = fixture.debugElement.queryAll(By.css('.preview-button')).length;
      expect(numberOfMatchesThatCanBePreviewd === Math.min(i, MAX_NUMBER_OF_MATCHES_REMOVED)).toBeTruthy();
    }
  });

  it('should allow the player to end his turn when the game is ongoing', () => {
    let state: State = {
      gameEnded: false,
      matchesToPreview: 0,
      matches: 1,
      player: PLAYERS[0]
    };

    (component as any).onNewState(state);
    fixture.detectChanges();

    let endTurnButton = fixture.debugElement.query(By.css('.end-turn'));
    let restartGameButton = fixture.debugElement.query(By.css('.restart-game'));
    expect(restartGameButton).toBeNull();
    expect(endTurnButton).toBeDefined();
  });

  it('should allow the player to restart the game when the game is over', () => {
    let state: State = {
      gameEnded: true,
      matchesToPreview: 0,
      matches: 0,
      player: PLAYERS[0]
    };

    (component as any).onNewState(state);
    fixture.detectChanges();

    let endTurnButton = fixture.debugElement.query(By.css('.end-turn'));
    let restartGameButton = fixture.debugElement.query(By.css('.restart-game'));
    expect(endTurnButton).toBeNull();
    expect(restartGameButton).toBeDefined();
  });
});
