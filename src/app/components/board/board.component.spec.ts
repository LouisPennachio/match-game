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
      expect((component as any).getMatchesElements().length === state.matches).toBe(true);
    }
  });
  //>...
  // describe('matches preview', () => {
  //   function checkPreview(state: State) {
  //     it('should preview the proper number of matches', () => {
  //       component.onNewState(state);

  //       fixture.detectChanges();

  //       let removableMatches = (component as any).getPlayableMatches((component as any).getMatchesElements(fixture.debugElement.nativeElement));

  //       removableMatches.map((match, index) => {
  //         expect((component as any).shouldOpacifyMatch(index, state.matchesToPreview) === match.classList.contains('transparent-match')).toBe(true);
  //       });

  //     });
  //   }

  //   // We make the test for any relevant number of matches (eg: zero up to the max number of matches that could be taken plus one seems a good interval)
  //   for (var matches = 0; matches <= MAX_NUMBER_OF_MATCHES_REMOVED + 1; matches++) {
  //     for (var matchesToPreview = 1; matchesToPreview <= MAX_NUMBER_OF_MATCHES_REMOVED; matchesToPreview++) {
  //       let state: State = {
  //         gameEnded: false,
  //         matchesToPreview: matchesToPreview,
  //         matches: matches,
  //         player: PLAYERS[0]
  //       };

  //       checkPreview(state);

  //       // let removableMatches = (component as any).getPlayableMatches((component as any).getMatchesElements(fixture.debugElement.nativeElement));
  //       // console.log('matches=' + matches + ' ' + 'matchesToPreview=' + matchesToPreview);
  //       // console.log(removableMatches);

  //       //

  //       // removableMatches.map((match, index) => {
  //       // console.log('matches=' + matches + ' ' + 'matchesToPreview=' + matchesToPreview + ' ' + 'index=' + index + ' ' + 'shouldOpacify=' + (component as any).shouldOpacifyMatch(index, matchesToPreview) + ' ' + 'isOpacified=' + match.classList.contains('transparent-match'));
  //       //   expect((component as any).shouldOpacifyMatch(index, matchesToPreview) === match.classList.contains('transparent-match')).toBe(true);
  //       // });
  //     }
  //   }
  // });


  it('should preview the proper number of matches', () => {
    let state: State = {
      gameEnded: false,
      matchesToPreview: 2,
      matches: 2,
      player: PLAYERS[0]
    };

    component.onNewState(state);

    fixture.detectChanges();

    console.log('lel');

    let matches = fixture.debugElement.queryAll(By.css('.transparent-match'))[0].nativeElement;
      console.log(matches);
   
    // let removableMatches = (component as any).getPlayableMatches((component as any).getMatchesElements(fixture.elementRef.nativeElement));

    // removableMatches.map((match, index) => {
    //   console.log(match)
    //   console.log('matches=' + state.matches + ' ' + 'matchesToPreview=' + state.matchesToPreview + ' ' + 'index=' + index + ' ' + 'shouldOpacify=' + (component as any).shouldOpacifyMatch(index, state.matchesToPreview) + ' ' + 'isOpacified=' + match.classList.contains('transparent-match'));
    //   expect((component as any).shouldOpacifyMatch(index, state.matchesToPreview) === match.classList.contains('transparent-match')).toBe(true);
    // });
  });



    // for (var matches = 0; matches <= MAX_NUMBER_OF_MATCHES_REMOVED + 1; matches++) {
    //   for (var matchesToPreview = 1; matchesToPreview <= MAX_NUMBER_OF_MATCHES_REMOVED; matchesToPreview++) {
    //     let state: State = {
    //       gameEnded: false,
    //       matchesToPreview: matchesToPreview,
    //       matches: matches,
    //       player: PLAYERS[0]
    //     };

    //     component.onNewState(state);

    //     fixture.detectChanges();

    //     let removableMatches = (component as any).getPlayableMatches((component as any).getMatchesElements());

    //     removableMatches.map((match, index) => {
    //       console.log('matches=' + matches + ' ' + 'matchesToPreview=' + matchesToPreview + ' ' + 'index=' + index + ' ' + 'shouldOpacify=' + (component as any).shouldOpacifyMatch(index, matchesToPreview) + ' ' + 'isOpacified=' + match.classList.contains('transparent-match'));
    //       expect((component as any).shouldOpacifyMatch(index, state.matchesToPreview) === match.classList.contains('transparent-match')).toBe(true);
    //     });
    //   }
    // }
    // });
  });
