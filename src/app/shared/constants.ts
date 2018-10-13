import { Player } from './../model/player';

export const MIN_NUMBER_OF_MATCHES = 11;
export const NUMBER_OF_MATCHES_VARIATIONS = 6;
export const MAX_NUMBER_OF_MATCHES_REMOVED = 3;
export const MAX_NUMBER_OF_MATCHES = MIN_NUMBER_OF_MATCHES + NUMBER_OF_MATCHES_VARIATIONS;

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
