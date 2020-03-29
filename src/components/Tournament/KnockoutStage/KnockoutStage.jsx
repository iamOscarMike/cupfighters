import React from "react";
import { useSelector } from "react-redux";
import { getActiveTournament, getMatches } from "../../../redux/selectors";

function KnockoutStage() {
    const tournament = useSelector((state) => (getActiveTournament(state)));
    const matches = useSelector((state) => (getMatches(state)));

    return (
        <div className="KnockoutStage">
        </div>
    );
}

export default KnockoutStage;
