import { find } from 'lodash';

export function matchesContainsMatch(matches, player1, player2) {
    return Boolean(
        find(matches, (match) => {
            return (match.player1 == player1 && match.player2 == player2)
                || (match.player1 == player2 && match.player2 == player1)
        })
    );
}

export default function generateGroupMatches(players) {
    let matches = [];
    let numberOfGamesPerPlayer = [];
    const numberOfGames = players.length - 1;
    players.forEach((player, playerIndex) => {
        numberOfGamesPerPlayer[playerIndex] = 0;
    });

    while (numberOfGamesPerPlayer.filter((currentNumberOfGames) => (currentNumberOfGames < numberOfGames)).length) {
        const sortedByNumberOfGames = Object.entries(numberOfGamesPerPlayer)
            .map(([playerKey, games]) => ([parseInt(playerKey, 10), games]))
            .sort(([, games1], [, games2]) => (games1 - games2));
        const [[player1Id, currentNumberOfGames]] = sortedByNumberOfGames;
        const [[player2Id]] = sortedByNumberOfGames.filter(([playerId]) => {
            return playerId !== player1Id && !matchesContainsMatch(matches, players[player1Id], players[playerId])
        });

        const player1 = players[player1Id];
        const player2 = players[player2Id];

        const match = currentNumberOfGames === 0 || currentNumberOfGames % 2 === 0
            ? { player1, player2 }
            : { player1: player2, player2: player1 };

        matches.push({
            ...match,
            score1: null,
            score2: null,
        })
        numberOfGamesPerPlayer[player1Id]++;
        numberOfGamesPerPlayer[player2Id]++;
    }
    return matches;
}