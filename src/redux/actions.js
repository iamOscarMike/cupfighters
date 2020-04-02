import {
    START_NEW_TOURNAMENT,
    SET_ACTIVE_TOURNAMENT,
    UNSET_ACTIVE_TOURNAMENT,
    DELETE_TOURNAMENT,
    FINISH_SETUP,
    UPDATE_MATCH,
    FINISH_GROUP_STAGE,
    FINISH_KNOCKOUT_ROUND,
    FINISH_TOURNAMENT,
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

export const finishSetup = (players, amountOfPlayersInKnockout, groupSize) => ({
    type: FINISH_SETUP,
    payload: {
        players,
        amountOfPlayersInKnockout,
        groupSize,
    },
});

export const updateMatch = (matchId, score1, score2, throughOnPenalties = null) => ({
    type: UPDATE_MATCH,
    payload: {
        matchId,
        score1: score1 !== null ? parseInt(score1) : null,
        score2: score2 !== null ? parseInt(score2) : null,
        throughOnPenalties
    },
});

export const finishGroupStage = () => ({
    type: FINISH_GROUP_STAGE,
    payload: {},
});

export const finishKnockoutRound = () => ({
    type: FINISH_KNOCKOUT_ROUND,
    payload: {},
});

export const finishTournament = () => ({
    type: FINISH_TOURNAMENT,
    payload: {},
});