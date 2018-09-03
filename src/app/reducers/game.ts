import * as game from '../actions/game';
import * as matches from '../actions/matches';
import * as playerHelper from '../shared/helpers/player'
import * as matchesHelper from '../shared/helpers/matches'
import { Player } from '../model/player';

export interface State {
    gameEnded: boolean;
    matchesToPreview: number;
    matches: number;
    player: Player;
};

// export const initialState: State = {
//     gameEnded: true,
//     matchesToPreview: 0,
//     matches: 0,
//     player: undefined
// };

export function gameReducer(state: State, action: matches.Actions | game.Actions): State {
    switch (action.type) {
        case game.INIT:
            return {
                gameEnded: false,
                matchesToPreview: 0,
                matches: matchesHelper.getRandomNumberOfMatches(),
                player: playerHelper.getNextPlayer()
            }
        case (matches.PREVIEW):
            return {
                gameEnded: state.gameEnded,
                matchesToPreview: action.payload,
                matches: state.matches,
                player: state.player
            }
        case (matches.TAKE):
            // A player must pick a number of matches to remove before ending his turn.
            if (state.matchesToPreview == 0) {
                return state;
            }

            let remainingMatches = state.matches - state.matchesToPreview;
            return {
                gameEnded: remainingMatches == 0,
                matchesToPreview: 0,
                matches: remainingMatches,
                player: remainingMatches == 0 ? state.player : playerHelper.getNextPlayer(state.player)
            }
        default:
            return state;
    }
}