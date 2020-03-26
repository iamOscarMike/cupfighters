import getPlayersThroughFromStats from './getPlayersThroughFromStats';

describe('getPlayersThroughFromStats', () => {

    const stats = [
        [
            { player: 'player#1', played: 2, won: 2, draw: 0, lost: 1, goalsFor: 4, goalsAgainst: 0, goalDifference: 4, points: 6 },
            { player: 'player#2', played: 2, won: 1, draw: 0, lost: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 3 },
            { player: 'player#3', played: 2, won: 0, draw: 0, lost: 2, goalsFor: 0, goalsAgainst: 4, goalDifference: -4, points: 0 },
        ],
        [
            { player: 'player#4', played: 2, won: 1, draw: 1, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 4 },
            { player: 'player#5', played: 2, won: 1, draw: 0, lost: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 3 },
            { player: 'player#6', played: 2, won: 0, draw: 1, lost: 1, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 1 },
        ],
        [
            { player: 'player#7', played: 2, won: 0, draw: 2, lost: 0, goalsFor: 3, goalsAgainst: 3, goalDifference: 0, points: 2 },
            { player: 'player#8', played: 2, won: 0, draw: 2, lost: 0, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 2 },
            { player: 'player#9', played: 2, won: 0, draw: 2, lost: 0, goalsFor: 1, goalsAgainst: 1, goalDifference: 0, points: 2 },
        ],
    ];

    it('returns players through', () => {
        const { playersThrough } = getPlayersThroughFromStats(stats, 2, 2);
        expect(playersThrough).toContain('player#1');
        expect(playersThrough).toContain('player#2');
        expect(playersThrough).toContain('player#4');
        expect(playersThrough).toContain('player#5');
        expect(playersThrough).toContain('player#7');
        expect(playersThrough).toContain('player#8');
    });

    it('returns players best third', () => {
        const { playersBestThird } = getPlayersThroughFromStats(stats, 2, 2);
        expect(playersBestThird).toContain('player#6');
        expect(playersBestThird).toContain('player#9');
    });
});
