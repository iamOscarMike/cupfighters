import { getTournamentList } from "./selectors";

describe('selectors', () => {
    it('returns a list of tournaments', () => {
        const tournamentKey1 = 'tournament#123';
        const tournamentTitle1 = 'My first tournament';
        const tournamentKey2 = 'tournament#456';
        const tournamentTitle2 = 'My second tournament';

        expect(getTournamentList({
            tournaments: {
                [tournamentKey1]: { title: tournamentTitle1 },
                [tournamentKey2]: { title: tournamentTitle2 },
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