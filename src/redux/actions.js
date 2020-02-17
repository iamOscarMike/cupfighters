import { START_NEW_TOURNAMENT, SET_ACTIVE_TOURNAMENT } from "./actionTypes";

export const startNewTournament = title => ({
    type: START_NEW_TOURNAMENT,
    payload: {
        title,
    },
});

export const setActiveTournament = tournamentId => ({
    type: SET_ACTIVE_TOURNAMENT,
    payload: {
        tournamentId,
    },
});