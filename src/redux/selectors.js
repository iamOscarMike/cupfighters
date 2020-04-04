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

    return {
        winner,
        runnerUp,
        semiFinalists,
    };
}