import {
    START_NEW_TOURNAMENT,
    SET_ACTIVE_TOURNAMENT,
    UNSET_ACTIVE_TOURNAMENT,
    DELETE_TOURNAMENT,
    FINISH_SETUP,
    UPDATE_MATCH,
    FINISH_GROUP_STAGE,
} from "../actionTypes";
import { stages } from "../../types/stages";
import generatePlayers from "./tournaments/generatePlayers";
import generateGroups from "./tournaments/generateGroups";
import generateKnockoutMatches from "./tournaments/generateKnockoutMatches";

function generateMatchId() {
    return 'match#' + Math.random().toString(10).substr(2, 10);
};

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
            const { amountOfPlayersInKnockout, groupSize } = action.payload;
            const players = generatePlayers(action.payload.players);
            const matches = {};
            const groups = generateGroups(players, groupSize).map((group) => {
                return {
                    players: group.players,
                    matches: group.matches.map((match) => {
                        const matchId = generateMatchId();
                        matches[matchId] = match;
                        return matchId;
                    }),
                }
            });
            const tournamentId = state.activeTournamentId;
            return {
                ...state,
                list: {
                    ...state.list,
                    [tournamentId]: {
                        ...state.list[tournamentId],
                        stage: stages.groupStage,
                        players,
                        amountOfPlayersInKnockout,
                        groupSize,
                        groups,
                        matches,
                    }
                }
            };
        }
        case UPDATE_MATCH: {
            const tournamentId = state.activeTournamentId;
            const matchId = action.payload.matchId;
            return {
                ...state,
                list: {
                    ...state.list,
                    [tournamentId]: {
                        ...state.list[tournamentId],
                        matches: {
                            ...state.list[tournamentId].matches,
                            [matchId]: {
                                ...state.list[tournamentId].matches[matchId],
                                score1: action.payload.score1,
                                score2: action.payload.score2,
                            }
                        },
                    },
                }
            }
        }
        case FINISH_GROUP_STAGE: {
            const tournamentId = state.activeTournamentId;
            const matches = {};
            generateKnockoutMatches(state.list[tournamentId]).forEach((match) => {
                matches[generateMatchId()] = match;
            });

            return {
                ...state,
                list: {
                    ...state.list,
                    [tournamentId]: {
                        ...state.list[tournamentId],
                        stage: stages.knockoutStage,
                        matches: {
                            ...state.list[tournamentId].matches,
                            ...matches,
                        },
                        knockoutRounds: [{ matches: Object.keys(matches) }],
                    },
                }
            }
        }
        default:
            return state;
    }
}
