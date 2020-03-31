import React from "react";
import { useSelector } from "react-redux";
import { getActiveTournament } from "../../../redux/selectors";
import Bracket from "./Bracket/Bracket";
import Match from "../../Match/Match";
import "./KnockoutStage.scss";

const getRounds = (rounds) => {
    const roundTitles = { 1: 'Final', 2: 'Semi-finals', 4: 'Quarter-finals' };
    const roundGroupIndicators = { 1: 'F', 2: 'S', 4: 'Q' };

    return rounds.map((round, i) => {
        return (
            <div key={i} className="row">
                <div className="col-sm-12">
                    <h2 className="text-center mt-5">
                        {`${roundTitles[round.matches.length]}`}
                    </h2>
                    <div className="row match-container">
                        {round.matches.map((match, j) => (
                            <Match
                                allowPenalties={true}
                                key={`${i}-${j}`}
                                matchId={match}
                                matchIndicator={roundGroupIndicators[round.matches.length] + (j + 1)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    });
};

function KnockoutStage() {
    const tournament = useSelector((state) => (getActiveTournament(state)));
    const rounds = getRounds(tournament.knockoutRounds);
    return (
        <div className="KnockoutStage">
            <Bracket
                matches={tournament.matches}
                players={tournament.players}
                rounds={tournament.knockoutRounds}
            />

            <div className="row col-sm-12 col-md-10 offset-md-1">
                {rounds}
            </div>
        </div>
    );
}

export default KnockoutStage;
