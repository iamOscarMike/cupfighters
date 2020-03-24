import {
    startNewTournament,
    setActiveTournament,
    unsetActiveTournament,
    deleteTournament,
    finishSetup,
    updateMatch,
} from "./actions";
import {
    START_NEW_TOURNAMENT,
    SET_ACTIVE_TOURNAMENT,
    UNSET_ACTIVE_TOURNAMENT,
    DELETE_TOURNAMENT,
    FINISH_SETUP,
    UPDATE_MATCH,
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

    it('creates a finish setup action', () => {
        const players = ['Ono', 'Tomasson'];
        const amountOfPlayersInKnockOut = 2;
        const groupSize = 3;
        const expectedAction = { type: FINISH_SETUP, payload: { players, amountOfPlayersInKnockOut, groupSize } };
        expect(finishSetup(players, amountOfPlayersInKnockOut, groupSize)).toEqual(expectedAction);
    });

    it('creates an update match action', () => {
        const matchId = 'match#123';
        const score1 = 6;
        const score2 = 2;
        const expectedAction = { type: UPDATE_MATCH, payload: { matchId, score1, score2 } };
        expect(updateMatch(matchId, score1, score2)).toEqual(expectedAction);
    });
});
