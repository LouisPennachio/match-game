import { MIN_NUMBER_OF_MATCHES, NUMBER_OF_MATCHES_VARIATIONS } from './../constants';

/**
  * Returns a random number of matches to fill the board.
  * The number of matches is between {@link MIN_NUMBER_OF_MATCHES} and {@link MIN_NUMBER_OF_MATCHES} + {@link NUMBER_OF_MATCHES_VARIATIONS}
  */
export function getRandomNumberOfMatches() {
    return MIN_NUMBER_OF_MATCHES + Math.ceil(Math.random() * NUMBER_OF_MATCHES_VARIATIONS);
}