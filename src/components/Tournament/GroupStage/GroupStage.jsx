import React from "react";
import { useSelector } from "react-redux";
import { getActiveTournamentGroups } from "../../../redux/selectors";
import Table from "./Table/Table";
import Match from "../../Match/Match";
import './GroupStage.scss';

function GroupStage() {

    const groups = useSelector((state) => (getActiveTournamentGroups(state)));

    const matchElements = () => {
        if (!groups) {
            return [];
        }
        const numberOfGroups = groups.length;
        const numberOfMatchersPerGroup = groups[0].matches.length;

        let elements = []; let i; let j;
        for (i = 0; i < numberOfMatchersPerGroup; i++) {
            for (j = 0; j < numberOfGroups; j++) {
                elements.push(<Match
                    key={`${j}-${i}`}
                    matchId={groups[j].matches[i]}
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
                        {groups.map((group, index) => (
                            <div key={index} className="col-md-6">
                                <h3>{`Group ${String.fromCharCode(97 + index)}`}</h3>
                                <Table />
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

                </div>
            </div>
        </div>
    );
}

export default GroupStage;
