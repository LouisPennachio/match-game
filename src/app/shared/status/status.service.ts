import { BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Handles the display of a message in the status bar.
 */
export class StatusService {
  /**
   * Emits the message to display in the status bar.
   */
  private status: Subject<String> = new ReplaySubject(1);

  /**
   * Displays a message in the status bar.
   * 
   * If the game is ongoing, the message will tell whose turn it is.
   * Otherwise, the message will tell who won the game.
   * 
   * @param name The name of the current player.
   * @param gameEnded True if the game ended, false otherwise.
   */
  updateStatus(player: any, gameEnded: boolean) {
    if (!gameEnded) {
      this.status.next(`It's ${player.name} turn !`);
    } else {
      this.status.next(`${player.name} won !`)
    }
  }
}
