import tournaments from "./tournaments";
import {
    START_NEW_TOURNAMENT,
    SET_ACTIVE_TOURNAMENT,
    UNSET_ACTIVE_TOURNAMENT,
    DELETE_TOURNAMENT,
    FINISH_SETUP,
    UPDATE_MATCH,
    FINISH_GROUP_STAGE,
} from "../actionTypes";
import { stages } from "../../types/stages";
import generateKnockoutMatches from "./tournaments/generateKnockoutMatches";

jest.mock("./tournaments/generateKnockoutMatches");

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
        const amountOfPlayersInKnockout = 4;
        const groupSize = 3;
        const payload = { tournamentId, players, amountOfPlayersInKnockout, groupSize };

        const otherTournamentId = 'tournament#456';
        const otherTournament = { title: 'My inactive tournament' };

        const store = tournaments(
            {
                activeTournamentId: tournamentId,
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
        expect(store.list[tournamentId].amountOfPlayersInKnockout).toEqual(amountOfPlayersInKnockout);
        expect(store.list[tournamentId].groupSize).toEqual(groupSize);
        expect(store.list[tournamentId].groups).toBeInstanceOf(Array);
        expect(store.list[tournamentId].groups[0]).toBeInstanceOf(Object);
        expect(store.list[tournamentId].groups[0].players).toBeInstanceOf(Array);
        expect(store.list[tournamentId].groups[0].matches).toBeInstanceOf(Array);
        expect(store.list[tournamentId].groups[0].matches[0]).toMatch(/match#([0-9]{10})/);
        expect(store.list[tournamentId].matches).toBeInstanceOf(Object);
        expect(store.list[otherTournamentId]).toEqual(otherTournament);
    });

    it('updates a match', () => {
        const tournamentId = 'tournament#123';
        const matchId = 'match#123';
        const score1 = 6;
        const score2 = 2;
        const payload = { matchId, score1, score2 };

        const otherTournamentId = 'tournament#456';
        const otherTournament = { title: 'My inactive tournament' };
        const otherMatchId = 'match#456';

        const store = tournaments(
            {
                activeTournamentId: tournamentId,
                list: {
                    [tournamentId]: {
                        title: 'My active tournament',
                        stage: stages.groupStage,
                        matches: {
                            [matchId]: {
                                player1: "player#123",
                                player2: "player#234",
                                score1: null,
                                score2: null,
                            },
                            [otherMatchId]: {
                                player1: "player#345",
                                player2: "player#456",
                                score1: null,
                                score2: null,
                            },
                        },
                    },
                    [otherTournamentId]: otherTournament,
                },
            },
            {
                type: UPDATE_MATCH,
                payload,
            }
        );

        expect(store.list[tournamentId].matches[matchId]).toEqual({
            player1: "player#123",
            player2: "player#234",
            score1: 6,
            score2: 2,
        });

        expect(store.list[tournamentId].matches[otherMatchId]).toEqual({
            player1: "player#345",
            player2: "player#456",
            score1: null,
            score2: null,
        });

        expect(store.list[otherTournamentId]).toEqual(otherTournament);
    });

    it('finishes the group stage', () => {
        const tournamentId = 'tournament#123';
        const matches = [
            { player1: 'player#1', player2: 'player#2', score1: null, score2: null },
            { player1: 'player#3', player2: 'player#4', score1: null, score2: null },
        ];
        generateKnockoutMatches.mockImplementation(() => (matches));
        const store = tournaments(
            {
                activeTournamentId: tournamentId,
                list: {
                    [tournamentId]: {
                        title: 'My active tournament',
                        stage: stages.groupStage,
                        amountOfPlayersInKnockout: 8,
                        matches: {},
                    },
                },
            },
            {
                type: FINISH_GROUP_STAGE,
                payload: {},
            }
        );
        expect(store.list[tournamentId].stage).toEqual(stages.knockoutStage);
        expect(Object.values(store.list[tournamentId].matches)[0]).toEqual(matches[0]);
        expect(Object.values(store.list[tournamentId].matches)[1]).toEqual(matches[1]);
        
        const matchIds = Object.keys(store.list[tournamentId].matches);
        expect(store.list[tournamentId].knockoutRounds[0].matches).toContain(matchIds[0]);
        expect(store.list[tournamentId].knockoutRounds[0].matches).toContain(matchIds[1]);
    });
});