import { createGroupsStats, getPlayersThroughFromStats } from "../../../components/Tournament/GroupStage/scripts/stats";

export default function generateKnockoutMatches(tournament) {
    const stats = createGroupsStats(tournament.groups, tournament.matches);
    const numberOfPlayersThroughPerGroup = Math.floor(parseInt(tournament.amountOfPlayersInKnockout) / tournament.groups.length);
    const numberOfPlayersBestThird = Math.floor(parseInt(tournament.amountOfPlayersInKnockout) % tournament.groups.length);
    let playersInKnockout = [];
    for (let i = 0; i < numberOfPlayersThroughPerGroup; i++) {
        stats.forEach((group) => { playersInKnockout.push(group[i].player) });
    }
    const { playersBestThird } = getPlayersThroughFromStats(stats, numberOfPlayersThroughPerGroup, numberOfPlayersBestThird, tournament.matches);

    const indexBestOfTheRest = tournament.amountOfPlayersInKnockout / 2;
    const homePlayers = playersInKnockout.slice(0, indexBestOfTheRest);
    const awayPlayers = playersBestThird.concat(playersInKnockout.slice(indexBestOfTheRest));

    const matches = [];
    homePlayers.forEach(homePlayer => {
        let playersInGroup = [];
        tournament.groups.forEach(group => {
            if (group.players.includes(homePlayer)) {
                playersInGroup = group.players;
            }
        });
        const awayPlayer = awayPlayers.filter(awayPlayer => (
            !playersInGroup.includes(awayPlayer)
        ))[0];

        matches.push({ player1: homePlayer, player2: awayPlayer, score1: null, score2: null });
        awayPlayers.splice(awayPlayers.indexOf(awayPlayer), 1);
    });
    return matches;
}