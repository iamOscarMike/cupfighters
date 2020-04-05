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
            : finalMatch.throughOnPenalties
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

    const biggestWin = Object.entries(tournament.matches).sort((match1, match2) => {
        const match1GoalDifference = Math.abs(match1[1].score1 - match1[1].score2);
        const match2GoalDifference = Math.abs(match2[1].score1 - match2[1].score2);

        if (match1GoalDifference !== match2GoalDifference) {
            return match1GoalDifference < match2GoalDifference ? 1 : -1;
        }

        const match1MaxScore = Math.max(match1[1].score1, match1[1].score2);
        const match2MaxScore = Math.max(match2[1].score1, match2[1].score2);

        if (match1MaxScore !== match2MaxScore) {
            return match1MaxScore < match2MaxScore ? 1 : -1;
        }

        const matchIndexes = Object.keys(tournament.matches);
        return matchIndexes.indexOf(match2[0]) - matchIndexes.indexOf(match1[0]);
    })[0][0];

    const highestScoringMatch = Object.entries(tournament.matches).sort((match1, match2) => {
        const match1Goals = match1[1].score1 + match1[1].score2;
        const match2Goals = match2[1].score1 + match2[1].score2;

        if (match1Goals !== match2Goals) {
            return match1Goals < match2Goals ? 1 : -1;
        }

        const matchIndexes = Object.keys(tournament.matches);
        return matchIndexes.indexOf(match2[0]) - matchIndexes.indexOf(match1[0]);
    })[0][0];

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
        biggestWin,
        highestScoringMatch,
    };
}