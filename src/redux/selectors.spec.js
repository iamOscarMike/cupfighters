import {
    getTournamentList,
    getActiveTournament,
    getActiveTournamentGroups,
} from "./selectors";

describe('getTournamentList', () => {
    it('returns a list of tournaments', () => {
        const tournamentKey1 = 'tournament#123';
        const tournamentTitle1 = 'My first tournament';
        const tournamentKey2 = 'tournament#456';
        const tournamentTitle2 = 'My second tournament';

        expect(getTournamentList({
            tournaments: {
                list: {
                    [tournamentKey1]: { title: tournamentTitle1 },
                    [tournamentKey2]: { title: tournamentTitle2 },
                },
            }
        })).toEqual([
            { tournamentId: tournamentKey1, title: tournamentTitle1 },
            { tournamentId: tournamentKey2, title: tournamentTitle2 },
        ]);
    });

    it('returns an empty array if there are no tournaments', () => {
        expect(getTournamentList({})).toEqual([]);
    });
});

describe('getActiveTournament', () => {
    it('returns the active tournament', () => {
        const activeTournamentId = 'tournament#789';
        const tournament = { title: 'My active tournament' };
        expect(getActiveTournament({
            tournaments: {
                activeTournamentId,
                list: { [activeTournamentId]: tournament },
            },
        })).toEqual(tournament);
    });

    it('returns null if the active tournament does not exist', () => {
        expect(getActiveTournament({
            activeTournamentId: 'tournament#123',
            tournaments: { ['tournament#456']: { title: 'Not the active tournament' } },
        })).toEqual(null);
    });

    it('returns null if no active tournament is set', () => {
        expect(getActiveTournament({
            tournaments: { ['tournament#456']: { title: 'Not the active tournament' } },
        })).toEqual(null);
    })
});

describe('getActiveTournamentGroups', () => {
    it('returns the groups of the current active tournament', () => {
        const activeTournamentId = 'tournament#789';
        const groups = [
            {
                players: ['player#123', 'player#124', 'player#125'],
                matches: ['match#123', 'match#124', 'match#125'],
            },
            {
                players: ['player#223', 'player#224', 'player#225'],
                matches: ['match#223', 'match#224', 'match#225'],
            },
        ];
        expect(getActiveTournamentGroups({
            tournaments: {
                activeTournamentId,
                list: {
                    [activeTournamentId]: {
                        title: 'My active tournament',
                        groups,
                    }
                },
            },
        })).toEqual(groups);
    });

    it('returns an empty array if the active tournament has no groups', () => {
        const activeTournamentId = 'tournament#789';
        expect(getActiveTournamentGroups({
            tournaments: {
                activeTournamentId,
                list: {
                    [activeTournamentId]: { title: 'My active tournament' },
                },
            },
        })).toEqual([]);
    });
});