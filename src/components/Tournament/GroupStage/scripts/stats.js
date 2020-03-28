import { find } from 'lodash';

function getMatchByPlayers(matches, player1, player2) {
    return find(matches, (match) => {
        return (match.player1 == player1 && match.player2 == player2)
            || (match.player1 == player2 && match.player2 == player1)
    });
}

function sortStats(stats, matches) {
    return Object.values(stats).sort((player1, player2) => {
        if (player1.points !== player2.points) {
            return (player1.points - player2.points) * -1;
        }
        if (player1.goalDifference !== player2.goalDifference) {
            return (player1.goalDifference - player2.goalDifference) * -1;
        }
        if (player1.goalsFor !== player2.goalsFor) {
            return (player1.goalsFor - player2.goalsFor) * -1;
        }
        const match = getMatchByPlayers(matches, player1.player, player2.player);
        if (match && Number.isInteger(match.score1) && Number.isInteger(match.score2)) {
            if (player1.player === match.player1) {
                return (match.score1 - match.score2) * -1;
            } else {
                return (match.score2 - match.score1) * -1;
            }
        }
        return 0;
    });
}

function createGroupsStats(groups, matches) {
    return groups.map((group) => {
        let players = {};
        group.players.forEach((player) => {
            players[player] = {
                player,
                played: 0,
                won: 0,
                draw: 0,
                lost: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalDifference: 0,
                points: 0,
            };
        });

        group.matches.forEach((matchId) => {
            const match = matches[matchId];
            if (match.score1 !== null && match.score2 !== null) {
                players[match.player1].played++;
                players[match.player2].played++;
                if (match.score1 > match.score2) {
                    players[match.player1].won++;
                    players[match.player2].lost++;
                    players[match.player1].points = players[match.player1].points + 3;
                } else if (match.score1 < match.score2) {
                    players[match.player2].won++;
                    players[match.player1].lost++;
                    players[match.player2].points = players[match.player2].points + 3;
                } else {
                    players[match.player1].draw++;
                    players[match.player1].points++;
                    players[match.player2].draw++;
                    players[match.player2].points++;
                }
                players[match.player1].goalsFor = players[match.player1].goalsFor + match.score1;
                players[match.player2].goalsFor = players[match.player2].goalsFor + match.score2;
                players[match.player1].goalsAgainst = players[match.player1].goalsAgainst + match.score2;
                players[match.player2].goalsAgainst = players[match.player2].goalsAgainst + match.score1;
                players[match.player1].goalDifference = players[match.player1].goalDifference + match.score1 - match.score2;
                players[match.player2].goalDifference = players[match.player2].goalDifference + match.score2 - match.score1;
            }
        });

        return sortStats(players, matches);
    });
}

function getPlayersThroughFromStats(stats, numberThroughPerGroup, numberBestThird, matches) {

    const playersThrough = new Array;
    stats.forEach((group) => {
        group.slice(0, numberThroughPerGroup).forEach((player) => {
            playersThrough.push(player.player);
        });
    });

    const playersBestThird = new Array;
    sortStats(
        Object.values(stats.map((group) => (group.slice(numberThroughPerGroup, numberThroughPerGroup + 1)[0]))),
        matches
    ).slice(0, numberBestThird).forEach((player) => {
        playersBestThird.push(player.player);
    });

    return {
        playersThrough,
        playersBestThird,
    }
}

export { createGroupsStats, getPlayersThroughFromStats };