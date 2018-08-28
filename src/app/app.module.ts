import { GameService } from './shared/game/game.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StatusComponent } from './status/status.component';
import { BoardComponent } from './board/board.component';
import { ControlsComponent } from './controls/controls.component';

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
