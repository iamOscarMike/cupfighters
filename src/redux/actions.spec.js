import { startNewTournament } from "./actions";
import { START_NEW_TOURNAMENT } from "./actionTypes";

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
});