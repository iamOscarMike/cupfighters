import generateGroupMatches, { matchesContainsMatch } from './generateGroupMatches';

describe('matchesContainsMatch', () => {
    it('sees that matches contain a match', () => {
        expect(
            matchesContainsMatch(
                [{ player1: 'player#123', player2: 'player#456' }],
                'player#123',
                'player#456',
            )
        ).toEqual(true);

        expect(
            matchesContainsMatch(
                [{ player1: 'player#123', player2: 'player#456' }],
                'player#456',
                'player#123',
            )
        ).toEqual(true);
    });

    it('sees that matches not contain a match', () => {
        expect(
            matchesContainsMatch(
                [{ player1: 'player#123', player2: 'player#456' }],
                'player#123',
                'player#789',
            )
        ).toEqual(false);
    });
});

describe('generateGroupMatches', () => {

    const expectMatchesToBeValid = (matches) => {
        matches.forEach((match) => {
            expect(match).toBeInstanceOf(Object);
            expect(match.player1).toMatch(/player#([0-9]{3})/);
            expect(match.player2).toMatch(/player#([0-9]{3})/);
            expect(match.score1).toEqual(null);
            expect(match.score2).toEqual(null);
        });
    };

    it('generates matches for a group with 3 players', () => {
        const matches = generateGroupMatches(['player#123', 'player#234', 'player#345']);
        expect(matches.length).toEqual(3);
        expectMatchesToBeValid(matches);
    });

    it('generates matches for a group with 4 players', () => {
        const matches = generateGroupMatches(['player#123', 'player#234', 'player#345', 'player#456']);
        expect(matches.length).toEqual(6);
        expectMatchesToBeValid(matches);
    });

    it('generates matches for a group with 5 players', () => {
        const matches = generateGroupMatches(['player#123', 'player#234', 'player#345', 'player#456', 'player#567']);
        expect(matches.length).toEqual(10);
        expectMatchesToBeValid(matches);
    });
});