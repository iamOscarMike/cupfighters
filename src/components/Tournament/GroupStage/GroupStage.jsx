import React from "react";
import { useSelector } from "react-redux";
import { getActiveTournamentGroups } from "../../../redux/selectors";
import Table from "./Table/Table";

function GroupStage() {

    const groups = useSelector((state) => (getActiveTournamentGroups(state)));

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
                </div>
            </div>
        </div>
    );
}

export default GroupStage;
