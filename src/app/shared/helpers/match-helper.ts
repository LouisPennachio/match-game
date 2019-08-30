import { MIN_NUMBER_OF_MATCHES, NUMBER_OF_MATCHES_VARIATIONS } from "../constants";

/**
 * Returns a random number of matches to fill the board.
 */
export function getRandomNumberOfMatches(): number {
    return MIN_NUMBER_OF_MATCHES + Math.ceil(Math.random() * NUMBER_OF_MATCHES_VARIATIONS);
}