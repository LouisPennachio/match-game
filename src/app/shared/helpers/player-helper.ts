import { Player } from "../../model/player";
import { PLAYERS } from "../constants";

/**
 * Returns the next player.
 * 
 * @param current The current player.
 */
export function getNextPlayer(current?: Player): Player {
    if (current == undefined) {
        return PLAYERS[0];
    }
    return PLAYERS.find(player => player.id == (current.id + 1) % 2);
}