export const getTournamentList = state => (
    state.tournaments
        ? Object.keys(state.tournaments).map((tournamentId) => ({
            tournamentId,
            title: state.tournaments[tournamentId].title
        }))
        : []
);
