import {
    startNewTournament,
    setActiveTournament,
    unsetActiveTournament,
    deleteTournament,
} from "./actions";
import {
    START_NEW_TOURNAMENT,
    SET_ACTIVE_TOURNAMENT,
    UNSET_ACTIVE_TOURNAMENT,
    DELETE_TOURNAMENT,
} from "./actionTypes";

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

    it('creates a unset active tournament action', () => {
        const expectedAction = { type: UNSET_ACTIVE_TOURNAMENT };
        expect(unsetActiveTournament()).toEqual(expectedAction);
    });

    it('creates a delete tournament action', () => {
        const tournamentId = 'tournament#123';
        const expectedAction = { type: DELETE_TOURNAMENT, payload: { tournamentId } };
        expect(deleteTournament(tournamentId)).toEqual(expectedAction);
    });
});
