import { ControlsComponent } from './components/controls/controls.component';
import { BoardComponent } from './components/board/board.component';
import { StatusComponent } from './components/status/status.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { gameReducer } from './reducers/game';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    BoardComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,

    // We add the game reducer to our module
    StoreModule.forRoot({ game: gameReducer })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
