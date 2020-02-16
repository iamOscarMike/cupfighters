import tournaments from "./tournaments";
import { START_NEW_TOURNAMENT } from "../actionTypes";

describe('tournaments', () => {
    it('adds a new started tournament to the store', () => {
        const payload = { title: 'My new tournament' };
        const store = tournaments({}, {
            type: START_NEW_TOURNAMENT,
            payload,
        });
        expect(store[Object.keys(store)[0]]).toEqual(payload);
    });

    it('keeps my old tournaments in the store', () => {
        const oldTournament = { title: 'My old tournament' };
        const oldTournamentKey = 'tournament#00000000';
        const payload = { title: 'My new tournament' };
        const store = tournaments(
            { [oldTournamentKey]: oldTournament },
            {
                type: START_NEW_TOURNAMENT,
                payload,
            }
        );
        expect(store[oldTournamentKey]).toEqual(oldTournament);
        expect(store[Object.keys(store)[1]]).toEqual(payload);
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