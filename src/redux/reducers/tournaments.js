import { START_NEW_TOURNAMENT } from "../actionTypes";

export default function (state = {}, action) {
    switch (action.type) {
        case START_NEW_TOURNAMENT: {
            const { title } = action.payload;
            const tournamentId = 'tournament#' + Math.random().toString(10).substr(2, 8);
            return {
                ...state,
                [tournamentId]: {
                    title,
                },
            };
        }
        default:
            return state;
    }
}
