import { Player } from './../model/player';

export var MIN_NUMBER_OF_MATCHES = 11;
export var NUMBER_OF_MATCHES_VARIATIONS = 6;
export var MAX_NUMBER_OF_MATCHES_REMOVED = 3;
export var MAX_NUMBER_OF_MATCHES = MIN_NUMBER_OF_MATCHES + NUMBER_OF_MATCHES_VARIATIONS;

export const PLAYERS: Player[] = [
    {
      id: 0,
      name: 'Player 1'
    },
    {
      id: 1,
      name: 'Player 2'
    }
  ];