import {
    START_NEW_TOURNAMENT,
    SET_ACTIVE_TOURNAMENT,
    UNSET_ACTIVE_TOURNAMENT,
    DELETE_TOURNAMENT,
} from "../actionTypes";

export default function (state = {}, action) {
    switch (action.type) {
        case START_NEW_TOURNAMENT: {
            const { title } = action.payload;
            const tournamentId = 'tournament#' + Math.random().toString(10).substr(2, 8);
            return {
                activeTournamentId: tournamentId,
                list: {
                    ...state.list,
                    [tournamentId]: {
                        title,
                    },
                },
            };
        }
        case SET_ACTIVE_TOURNAMENT: {
            return {
                ...state,
                activeTournamentId: action.payload.tournamentId,
            };
        }
        case UNSET_ACTIVE_TOURNAMENT: {
            return {
                ...state,
                activeTournamentId: null,
            };
        }
        case DELETE_TOURNAMENT: {
            delete state.list[action.payload.tournamentId];
            return state;
        }
        default:
            return state;
    }
}
