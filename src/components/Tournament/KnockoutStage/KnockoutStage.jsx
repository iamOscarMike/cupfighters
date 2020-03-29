import React from "react";
import { useSelector } from "react-redux";
import { getActiveTournament } from "../../../redux/selectors";
import Bracket from "./Bracket/Bracket";

function KnockoutStage() {
    const tournament = useSelector((state) => (getActiveTournament(state)));
    return (
        <div className="KnockoutStage">
            <Bracket
                matches={tournament.matches}
                players={tournament.players}
                rounds={tournament.knockoutRounds}
            />
        </div>
    );
}

export default KnockoutStage;
