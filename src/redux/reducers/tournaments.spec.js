import tournaments from "./tournaments";
import {
    START_NEW_TOURNAMENT,
    SET_ACTIVE_TOURNAMENT,
    UNSET_ACTIVE_TOURNAMENT,
    DELETE_TOURNAMENT,
    FINISH_SETUP,
} from "../actionTypes";
import { stages } from "../../types/stages";

describe('tournaments', () => {
    it('adds a new started tournament to the store', () => {
        const payload = { title: 'My new tournament' };
        const store = tournaments({}, {
            type: START_NEW_TOURNAMENT,
            payload,
        });
        const newTournamentId = Object.keys(store.list)[0];
        expect(store.activeTournamentId).toEqual(newTournamentId);
        expect(store.list[newTournamentId]).toEqual({ ...payload, stage: stages.setup });
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
        expect(store.list[newTournamentId]).toEqual({ ...payload, stage: stages.setup });
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

    it('finishes the setup', () => {
        const tournamentId = 'tournament#123';
        const tournamentTitle = 'My activeTournament';
        const players = ['Ono', 'Tomasson', 'van Hooijdonk', 'van Persie', 'Pauwe', 'Leonardo'];
        const amountOfPlayersInKnockOut = 4;
        const groupSize = 3;
        const payload = { tournamentId, players, amountOfPlayersInKnockOut, groupSize };

        const otherTournamentId = 'tournament#456';
        const otherTournament = { title: 'My inactive tournament' };

        const store = tournaments(
            {
                activeTournamentId: 'tournament#123',
                list: {
                    [tournamentId]: {
                        title: tournamentTitle,
                        stage: stages.setup,
                    },
                    [otherTournamentId]: otherTournament,
                },
            },
            {
                type: FINISH_SETUP,
                payload,
            }
        );

        expect(store.activeTournamentId).toEqual(tournamentId);

        expect(store.list[tournamentId].title).toEqual(tournamentTitle);
        expect(store.list[tournamentId].stage).toEqual(stages.groupStage);
        expect(store.list[tournamentId].players).toBeInstanceOf(Object);
        expect(store.list[tournamentId].amountOfPlayersInKnockOut).toEqual(amountOfPlayersInKnockOut);
        expect(store.list[tournamentId].groupSize).toEqual(groupSize);
        expect(store.list[tournamentId].groups).toBeInstanceOf(Array);
        expect(store.list[tournamentId].groups[0]).toBeInstanceOf(Object);
        expect(store.list[tournamentId].groups[0].players).toBeInstanceOf(Array);
        expect(store.list[tournamentId].groups[0].matches).toBeInstanceOf(Array);
        expect(store.list[tournamentId].groups[0].matches[0]).toMatch(/match#([0-9]{10})/);
        expect(store.list[tournamentId].matches).toBeInstanceOf(Object);
        expect(store.list[otherTournamentId]).toEqual(otherTournament);
    });
});