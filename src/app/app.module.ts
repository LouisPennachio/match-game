import { ControlsComponent } from './components/controls/controls.component';
import { BoardComponent } from './components/board/board.component';
import { StatusComponent } from './components/status/status.component';
import { GameService } from './shared/game/game.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    BoardComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
