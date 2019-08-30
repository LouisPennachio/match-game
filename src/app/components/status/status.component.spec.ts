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
});
