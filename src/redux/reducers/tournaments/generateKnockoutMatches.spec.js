import generateKnockoutMatches from './generateKnockoutMatches';
import { stages } from '../../../types/stages';

describe('generateKnockoutMatches', () => {
    it('generates knockout matches', () => {
        const matches = generateKnockoutMatches({
            title: 'My active tournament',
            stage: stages.groupStage,
            amountOfPlayersInKnockout: 8,
            groups: [
                { players: ['player#1', 'player#2', 'player#3'], matches: ['match#1', 'match#2', 'match#3'] },
                { players: ['player#4', 'player#5', 'player#6'], matches: ['match#4', 'match#5', 'match#6'] },
                { players: ['player#7', 'player#8', 'player#9'], matches: ['match#7', 'match#8', 'match#9'] },
            ],
            matches: {
                ['match#1']: { player1: "player#1", player2: "player#2", score1: 0, score2: 1 },
                ['match#2']: { player1: "player#3", player2: "player#1", score1: 0, score2: 0 },
                ['match#3']: { player1: "player#2", player2: "player#3", score1: 2, score2: 1 },
                ['match#4']: { player1: "player#4", player2: "player#5", score1: 3, score2: 0 },
                ['match#5']: { player1: "player#6", player2: "player#4", score1: 4, score2: 4 },
                ['match#6']: { player1: "player#5", player2: "player#6", score1: 1, score2: 2 },
                ['match#7']: { player1: "player#7", player2: "player#8", score1: 0, score2: 0 },
                ['match#8']: { player1: "player#9", player2: "player#7", score1: 3, score2: 0 },
                ['match#9']: { player1: "player#8", player2: "player#9", score1: 1, score2: 3 },
            },
        });

        expect(matches).toEqual([
            { player1: 'player#2', player2: 'player#7', score1: null, score2: null },
            { player1: 'player#4', player2: 'player#1', score1: null, score2: null },
            { player1: 'player#9', player2: 'player#6', score1: null, score2: null },
            { player1: 'player#3', player2: 'player#8', score1: null, score2: null },
        ]);
    });
});