import React from "react";
import { useSelector } from "react-redux";
import { getActiveTournament, getMatches } from "../../../redux/selectors";
import Table from "./Table/Table";
import Match from "../../Match/Match";
import { createGroupsStats, getPlayersThroughFromStats } from "./scripts/stats";
import './GroupStage.scss';
import { finishGroupStage } from "../../../redux/actions";
import { useDispatch } from "react-redux";

function GroupStage() {

    const tournament = useSelector((state) => (getActiveTournament(state)));
    const matches = useSelector((state) => (getMatches(state)));
    const groupStats = createGroupsStats(tournament.groups, matches);
    const { playersThrough, playersBestThird } = getPlayersThroughFromStats(
        groupStats,
        Math.floor(parseInt(tournament.amountOfPlayersInKnockOut) / tournament.groups.length),
        Math.floor(parseInt(tournament.amountOfPlayersInKnockOut) % tournament.groups.length),
        matches,
    );
    const allowNextStage = Object.values(matches).filter((match) => (!Number.isInteger(match.score1) || !Number.isInteger(match.score2))).length === 0;
    const dispatch = useDispatch();

    const matchElements = () => {
        if (!tournament.groups) {
            return [];
        }
        const numberOfGroups = tournament.groups.length;
        const numberOfMatchersPerGroup = tournament.groups[0].matches.length;

        let elements = []; let i; let j;
        for (i = 0; i < numberOfMatchersPerGroup; i++) {
            for (j = 0; j < numberOfGroups; j++) {
                elements.push(<Match
                    key={`${j}-${i}`}
                    matchId={tournament.groups[j].matches[i]}
                    matchIndicator={String.fromCharCode(97 + j) + (i + 1)}
                />);
            }
        }
        return elements;
    };

    return (
        <div className="GroupStage">
            <div className="row">
                <div className="col-sm-12 col-md-10 offset-md-1">

                    <div className="row">
                        {tournament.groups.map((group, index) => (
                            <div key={index} className="col-md-6">
                                <h3>{`Group ${String.fromCharCode(97 + index)}`}</h3>
                                <Table
                                    stats={groupStats[index]}
                                    playersThrough={playersThrough}
                                    playersBestThird={playersBestThird}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <h2 className="text-center mt-5">Fixtures</h2>
                            <div className="row match-container">
                                {matchElements()}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <button
                            type="button"
                            className={'btn btn-outline-primary btn-lg m-auto' + (allowNextStage ? '' : ' disabled')}
                            disabled={!allowNextStage}
                            onClick={() => { dispatch(finishGroupStage()) }}
                        >
                            Finish Group Stage
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupStage;
