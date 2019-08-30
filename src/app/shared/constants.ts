import { Player } from './../model/player';

/**
 * The min number of matches when the game starts.
 */
export const MIN_NUMBER_OF_MATCHES = 11;

/**
 * The max number of matches that can be added to the initial amount of matches.
 */
export const NUMBER_OF_MATCHES_VARIATIONS = 6;

/**
 * The max number of matches a player can remove every turn.
 */
export const MAX_NUMBER_OF_MATCHES_REMOVED = 3;

/**
 * The theoretical max number of matches.
 */
export const MAX_NUMBER_OF_MATCHES = MIN_NUMBER_OF_MATCHES + NUMBER_OF_MATCHES_VARIATIONS;

/**
 * The dummy players.
 */
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
