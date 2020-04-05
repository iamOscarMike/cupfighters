export const getTournamentList = state => (
    state.tournaments && state.tournaments.list
        ? Object.keys(state.tournaments.list).map((tournamentId) => ({
            tournamentId,
            title: state.tournaments.list[tournamentId].title
        }))
        : []
);

export const getActiveTournament = state => (
    (
        state.tournaments
        && state.tournaments.activeTournamentId
        && state.tournaments.list
        && state.tournaments.list[state.tournaments.activeTournamentId]
    ) || null
);

export const getActiveTournamentGroups = state => {
    const activeTournament = getActiveTournament(state);
    return (activeTournament && activeTournament.groups) || [];
};

export const getMatch = (state, matchId) => {
    const activeTournament = getActiveTournament(state);
    return activeTournament.matches[matchId];
};

export const getMatches = (state) => {
    const activeTournament = getActiveTournament(state);
    return activeTournament.matches;
};

export const getPlayer = (state, playerId) => {
    const activeTournament = getActiveTournament(state);
    return activeTournament.players[playerId];
};

export const getStats = (state) => {
    const tournament = getActiveTournament(state);

    const finalMatch = tournament.matches[tournament.knockoutRounds[tournament.knockoutRounds.length - 1].matches[0]];
    const winner = finalMatch.score1 > finalMatch.score2
        ? finalMatch.player1
        : (finalMatch.score2 > finalMatch.score1
            ? finalMatch.player2
            : finalMatch.playerTroughOnPenalties
        );
    const runnerUp = finalMatch.player1 === winner ? finalMatch.player2 : finalMatch.player1;

    const semiFinalists = tournament.knockoutRounds[tournament.knockoutRounds.length - 2].matches
        .map((matchId) => (tournament.matches[matchId]))
        .map((match) => ([match.player1, match.player2].filter((player) => (![winner, runnerUp].includes(player)))[0]));

    const playerStats = {};
    Object.keys(tournament.players).forEach((player) => {
        playerStats[player] = {
            player,
            played: 0,
            won: 0,
            draw: 0,
            lost: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDifference: 0,
            cleanSheets: 0,
        };
    });

    Object.values(tournament.matches).forEach((match) => {
        playerStats[match.player1].played++;
        playerStats[match.player2].played++;
        if (match.score1 > match.score2 || match.playerTroughOnPenalties === match.player1) {
            playerStats[match.player1].won++;
            playerStats[match.player2].lost++;
        } else if (match.score1 < match.score2 || match.playerTroughOnPenalties === match.player2) {
            playerStats[match.player2].won++;
            playerStats[match.player1].lost++;
        } else {
            playerStats[match.player1].draw++;
            playerStats[match.player2].draw++;
        }
        if (match.score1 === 0) {
            playerStats[match.player2].cleanSheets++;
        }
        if (match.score2 === 0) {
            playerStats[match.player1].cleanSheets++;
        }
        playerStats[match.player1].goalsFor = playerStats[match.player1].goalsFor + match.score1;
        playerStats[match.player2].goalsFor = playerStats[match.player2].goalsFor + match.score2;
        playerStats[match.player1].goalsAgainst = playerStats[match.player1].goalsAgainst + match.score2;
        playerStats[match.player2].goalsAgainst = playerStats[match.player2].goalsAgainst + match.score1;
        playerStats[match.player1].goalDifference = playerStats[match.player1].goalDifference + match.score1 - match.score2;
        playerStats[match.player2].goalDifference = playerStats[match.player2].goalDifference + match.score2 - match.score1;
    });

    const goldenBoot = Object.values(playerStats).sort((player1, player2) => {
        if (player1.goalsFor !== player2.goalsFor) {
            return player2.goalsFor - player1.goalsFor;
        }
        if (player1.played !== player2.played) {
            return player1.played - player2.played;
        }
        if (player1.goalDifference !== player2.goalDifference) {
            return player1.goalDifference > player2.goalDifference ? -1 : 1;
        }
        return 0;
    })
        .map((player) => (player.player))
        .slice(0, 3);

    const goldenGlove = Object.values(playerStats).sort((player1, player2) => {
        if (player1.cleanSheets !== player2.cleanSheets) {
            return player2.cleanSheets - player1.cleanSheets;
        }
        if (player1.goalsAgainst !== player2.goalsAgainst) {
            return player1.goalsAgainst < player2.goalsAgainst ? -1 : 1;
        }
        return 0;
    })
        .map((player) => (player.player))
        .slice(0, 3);

    const numberOfMatches = Object.keys(tournament.matches).length;
    const numberOfGoals = Object.values(playerStats)
        .map((player) => (player.goalsFor))
        .reduce((totalGoals, goals) => (totalGoals + goals));
    const averageGoalsPerMatch = Number(Math.round((numberOfGoals / numberOfMatches) + 'e1') + 'e-1');

    const numberOfCleanSheets = Object.values(playerStats)
        .map((player) => (player.cleanSheets))
        .reduce((totalCleanSheets, cleanSheets) => (totalCleanSheets + cleanSheets));
    const numberOfLittleJohns = Object.values(tournament.matches)
        .filter((match) => ((match.score1 >= 3 && match.score2 === 0) || (match.score2 >= 3 && match.score1 === 0)))
        .length;

    return {
        winner,
        runnerUp,
        semiFinalists,
        playerStats,
        goldenBoot,
        goldenGlove,
        numberOfMatches,
        numberOfGoals,
        averageGoalsPerMatch,
        numberOfCleanSheets,
        numberOfLittleJohns,
    };
}