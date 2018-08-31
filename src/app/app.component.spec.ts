import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { ControlsComponent } from './components/controls/controls.component';
import { BoardComponent } from './components/board/board.component';
import { StatusComponent } from './components/status/status.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { gameReducer } from './reducers/game';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        StatusComponent,
        BoardComponent,
        ControlsComponent
      ],
      imports: [
        BrowserModule,
        StoreModule.forRoot({ game: gameReducer })
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
