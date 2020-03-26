export default function getPlayersThroughFromStats(stats, numberThroughPerGroup, numberBestThird) {

    const playersThrough = new Array;
    stats.forEach((group) => {
        group.slice(0, numberThroughPerGroup).forEach((player) => {
            playersThrough.push(player.player);
        });

        group.slice(numberThroughPerGroup, numberThroughPerGroup + 1).forEach((player) => {
            // console.log(player.player);
        });
    });

    const playersBestThird = new Array;
    Object.values(stats.map((group) => (group.slice(numberThroughPerGroup, numberThroughPerGroup + 1)[0])))
        .sort((player1, player2) => {
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
        })
        .forEach((player) => {
            playersBestThird.push(player.player);
        });

    return {
        playersThrough,
        playersBestThird,
    }
}