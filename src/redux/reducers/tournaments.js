import {
    START_NEW_TOURNAMENT,
    SET_ACTIVE_TOURNAMENT,
    UNSET_ACTIVE_TOURNAMENT,
    DELETE_TOURNAMENT,
    FINISH_SETUP,
} from "../actionTypes";
import { stages } from "../../types/stages";
import generatePlayers from "./tournaments/generatePlayers";

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
                        stage: stages.setup,
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
        case FINISH_SETUP: {
            const { players, amountOfPlayersInKnockOut, groupSize } = action.payload;
            const tournamentId = state.activeTournamentId;
            return {
                ...state,
                list: {
                    ...state.list,
                    [tournamentId]: {
                        ...state.list[tournamentId],
                        stage: stages.groupStage,
                        players: generatePlayers(players),
                        amountOfPlayersInKnockOut,
                        groupSize,
                    }
                }
            };
        }
        default:
            return state;
    }
}
