import tournaments from "./tournaments";
import {
    START_NEW_TOURNAMENT,
    SET_ACTIVE_TOURNAMENT,
    UNSET_ACTIVE_TOURNAMENT,
    DELETE_TOURNAMENT,
} from "../actionTypes";

describe('tournaments', () => {
    it('adds a new started tournament to the store', () => {
        const payload = { title: 'My new tournament' };
        const store = tournaments({}, {
            type: START_NEW_TOURNAMENT,
            payload,
        });
        const newTournamentId = Object.keys(store.list)[0];
        expect(store.activeTournamentId).toEqual(newTournamentId);
        expect(store.list[newTournamentId]).toEqual(payload);
    });

    it('keeps my old tournaments in the store', () => {
        const oldTournament = { title: 'My old tournament' };
        const oldTournamentKey = 'tournament#00000000';
        const payload = { title: 'My new tournament' };
        const store = tournaments(
            { list: { [oldTournamentKey]: oldTournament } },
            {
                type: START_NEW_TOURNAMENT,
                payload,
            }
        );
        const newTournamentId = Object.keys(store.list)[1];
        expect(store.list[oldTournamentKey]).toEqual(oldTournament);
        expect(store.activeTournamentId).toEqual(newTournamentId)
        expect(store.list[newTournamentId]).toEqual(payload);
    });

    it('sets a tournament as active', () => {
        const tournamentId = 'tournament#123';
        const store = tournaments({}, {
            type: SET_ACTIVE_TOURNAMENT,
            payload: { tournamentId },
        })
        expect(store.activeTournamentId).toEqual(tournamentId);
    });

    it('unsets an active tournament', () => {
        const store = tournaments(
            { activeTournamentId: 'tournament#123' },
            { type: UNSET_ACTIVE_TOURNAMENT },
        );
        expect(store.activeTournamentId).toEqual(null);
    });

    it('deletes a tournament', () => {
        const tournamentId = 'tournament#123';
        const store = tournaments(
            { list: { [tournamentId]: {} } },
            { type: DELETE_TOURNAMENT, payload: { tournamentId } },
        );
        expect(store.list).toEqual({});
    });

    it('does nothing for unknown actions', () => {
        const payload = { title: 'My new tournament' };
        const store = tournaments({}, {
            type: 'UNKNOWN_ACTION',
            payload,
        });
        expect(store).toEqual({});
    });
});