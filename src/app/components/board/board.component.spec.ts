import { By } from '@angular/platform-browser';
import { State } from './../../reducers/game';
import { PLAYERS, MAX_NUMBER_OF_MATCHES_REMOVED, MAX_NUMBER_OF_MATCHES } from './../../shared/constants';
import { INIT } from './../../actions/game';
import { StoreModule } from '@ngrx/store';
import { AppModule } from './../../app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { gameReducer } from '../../reducers/game';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent],
      imports: [
        StoreModule.forRoot({ game: gameReducer })
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display any amount of matches properly', () => {
    // We make the test for any possible number of matches
    for (var i = 0; i <= MAX_NUMBER_OF_MATCHES; i++) {
      var state: State = {
        gameEnded: false,
        matchesToPreview: 0,
        matches: i,
        player: PLAYERS[0]
      };

      (component as any).onNewState(state);

      fixture.detectChanges();

      // We check that we have as many matches in the DOM as in the passed-in state
      expect(fixture.debugElement.queryAll(By.css('.match')).length === state.matches).toBe(true);
    }
  });

  it('should preview the proper number of matches', () => {
    for (var matches = 0; matches <= MAX_NUMBER_OF_MATCHES_REMOVED + 1; matches++) {
      for (var matchesToPreview = 1; matchesToPreview <= MAX_NUMBER_OF_MATCHES_REMOVED; matchesToPreview++) {
        let state: State = {
          gameEnded: false,
          matchesToPreview: matchesToPreview,
          matches: matches,
          player: PLAYERS[0]
        };

        component.onNewState(state);

        fixture.detectChanges();

        let matchesElements = fixture.debugElement.queryAll(By.css('.match')).map(match => match.nativeElement);
        let numberOfMatches = matchesElements.length;
        let matchesNotToPreviewElements = matchesElements.slice(0, Math.max(numberOfMatches - matchesToPreview, 0));
        let matchesToPreviewElements = matchesElements.slice(numberOfMatches - matchesToPreview, numberOfMatches);
        matchesNotToPreviewElements.map(match => {
          expect(match.classList.contains('transparent-match')).toBeFalsy();
        });
        matchesToPreviewElements.map(match => {
          expect(match.classList.contains('transparent-match')).toBeTruthy();
        });
      }
    }
  });
});
