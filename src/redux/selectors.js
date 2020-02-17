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