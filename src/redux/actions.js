import {
    START_NEW_TOURNAMENT,
    SET_ACTIVE_TOURNAMENT,
    UNSET_ACTIVE_TOURNAMENT,
    DELETE_TOURNAMENT,
    FINISH_SETUP,
    UPDATE_MATCH,
} from "./actionTypes";

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

export const unsetActiveTournament = () => ({ type: UNSET_ACTIVE_TOURNAMENT });

export const deleteTournament = tournamentId => ({
    type: DELETE_TOURNAMENT,
    payload: {
        tournamentId,
    },
});

export const finishSetup = (players, amountOfPlayersInKnockOut, groupSize) => ({
    type: FINISH_SETUP,
    payload: {
        players,
        amountOfPlayersInKnockOut,
        groupSize,
    },
});

export const updateMatch = (matchId, score1, score2) => ({
    type: UPDATE_MATCH,
    payload: {
        matchId,
        score1: score1 !== null ? parseInt(score1) : null,
        score2: score2 !== null ? parseInt(score2) : null,
    },
});