import { Player } from './../../model/player';
import { PLAYERS } from '../constants';

export function getNextPlayer(current?: Player): Player {
    if (current == undefined) {
        return PLAYERS[0];
    }
    return PLAYERS.find(player => player.id == (current.id + 1) % 2);
}