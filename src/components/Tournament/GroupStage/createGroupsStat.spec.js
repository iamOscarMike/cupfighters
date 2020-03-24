import createGroupsStats from './createGroupsStats';

describe('createGroupsStats', () => {
    it('creates groups stats', () => {
        const groups = [
            {
                players: ['player#1', 'player#2', 'player#3', 'player#4'],
                matches: ['match#1', 'match#2', 'match#3', 'match#4', 'match#5', 'match#6']
            },
            {
                players: ['player#5', 'player#6', 'player#7', 'player#8'],
                matches: ['match#7', 'match#8', 'match#9', 'match#10', 'match#11', 'match#12']
            },
        ];
        const matches = {
            ['match#1']: { player1: 'player#1', player2: 'player#2', score1: 3, score2: 0 },
            ['match#2']: { player1: 'player#3', player2: 'player#4', score1: 3, score2: 0 },
            ['match#3']: { player1: 'player#3', player2: 'player#1', score1: 1, score2: 1 },
            ['match#4']: { player1: 'player#2', player2: 'player#4', score1: 3, score2: 0 },
            ['match#5']: { player1: 'player#1', player2: 'player#4', score1: 1, score2: 1 },
            ['match#6']: { player1: 'player#2', player2: 'player#3', score1: 3, score2: 0 },
            ['match#7']: { player1: 'player#5', player2: 'player#6', score1: 2, score2: 1 },
            ['match#8']: { player1: 'player#7', player2: 'player#8', score1: 1, score2: 2 },
            ['match#9']: { player1: 'player#7', player2: 'player#5', score1: 1, score2: 0 },
            ['match#10']: { player1: 'player#6', player2: 'player#8', score1: null, score2: null },
            ['match#11']: { player1: 'player#5', player2: 'player#8', score1: null, score2: null },
            ['match#12']: { player1: 'player#6', player2: 'player#7', score1: null, score2: null },
        };
        expect(createGroupsStats(groups, matches)).toEqual([
            [
                {
                    player: 'player#2',
                    played: 3,
                    won: 2,
                    draw: 0,
                    lost: 1,
                    goalsFor: 6,
                    goalsAgainst: 3,
                    goalDifference: 3,
                    points: 6
                },
                {
                    player: 'player#1',
                    played: 3,
                    won: 1,
                    draw: 2,
                    lost: 0,
                    goalsFor: 5,
                    goalsAgainst: 2,
                    goalDifference: 3,
                    points: 5
                },
                {
                    player: 'player#3',
                    played: 3,
                    won: 1,
                    draw: 1,
                    lost: 1,
                    goalsFor: 4,
                    goalsAgainst: 4,
                    goalDifference: 0,
                    points: 4
                },
                {
                    player: 'player#4',
                    played: 3,
                    won: 0,
                    draw: 1,
                    lost: 2,
                    goalsFor: 1,
                    goalsAgainst: 7,
                    goalDifference: -6,
                    points: 1
                }
            ],
            [
                {
                    player: 'player#8',
                    played: 1,
                    won: 1,
                    draw: 0,
                    lost: 0,
                    goalsFor: 2,
                    goalsAgainst: 1,
                    goalDifference: 1,
                    points: 3
                },
                {
                    player: 'player#7',
                    played: 2,
                    won: 1,
                    draw: 0,
                    lost: 1,
                    goalsFor: 2,
                    goalsAgainst: 2,
                    goalDifference: 0,
                    points: 3
                },
                {
                    player: 'player#5',
                    played: 2,
                    won: 1,
                    draw: 0,
                    lost: 1,
                    goalsFor: 2,
                    goalsAgainst: 2,
                    goalDifference: 0,
                    points: 3
                },
                {
                    player: 'player#6',
                    played: 1,
                    won: 0,
                    draw: 0,
                    lost: 1,
                    goalsFor: 1,
                    goalsAgainst: 2,
                    goalDifference: -1,
                    points: 0
                }
            ]
        ]);
    });
});
