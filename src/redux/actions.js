import { START_NEW_TOURNAMENT } from "./actionTypes";

export const startNewTournament = title => ({
    type: START_NEW_TOURNAMENT,
    payload: {
        title
    },
});