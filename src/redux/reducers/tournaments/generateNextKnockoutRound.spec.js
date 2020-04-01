import generateNextKnockoutRound from './generateNextKnockoutRound';

describe('generateNextKnockoutRound', () => {
    it('generates the next knockout round', () => {
        const matches = generateNextKnockoutRound(
            {
                matches: [
                    'match#1',
                    'match#2',
                    'match#3',
                    'match#4',
                ],
            },
            {
                ['match#1']: { player1: 'player#1', player2: 'player#2', score1: 3, score2: 2 },
                ['match#2']: { player1: 'player#3', player2: 'player#4', score1: 2, score2: 2, throughOnPenalties: 'player#4' },
                ['match#3']: { player1: 'player#5', player2: 'player#6', score1: 0, score2: 2 },
                ['match#4']: { player1: 'player#7', player2: 'player#8', score1: 1, score2: 0 },
            }
        );

        expect(matches).toEqual([
            { player1: 'player#1', player2: 'player#6', score1: null, score2: null },
            { player1: 'player#4', player2: 'player#7', score1: null, score2: null },
        ]);
    });
});