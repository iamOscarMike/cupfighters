import { startNewTournament, setActiveTournament } from "./actions";
import { START_NEW_TOURNAMENT, SET_ACTIVE_TOURNAMENT } from "./actionTypes";

describe('actions', () => {
    it('creates a new tournament action', () => {
        const title = 'My new tournament';
        const expectedAction = {
            type: START_NEW_TOURNAMENT,
            payload: {
                title,
            },
        };
        expect(startNewTournament(title)).toEqual(expectedAction);
    });

    it('creates a set active tournament action', () => {
        const tournamentId = 'tournament#123';
        const expectedAction = {
            type: SET_ACTIVE_TOURNAMENT,
            payload: {
                tournamentId,
            },
        };
        expect(setActiveTournament(tournamentId)).toEqual(expectedAction);
    });
});
