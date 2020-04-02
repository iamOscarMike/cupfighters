import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActiveTournament } from "../../../redux/selectors";
import Bracket from "./Bracket/Bracket";
import Match from "../../Match/Match";
import "./KnockoutStage.scss";
import { finishKnockoutRound, finishTournament } from "../../../redux/actions";
import { stages } from "../../../types/stages";

const isRoundFinished = (rounds, i) => (rounds.length - 1 > i);

const roundComplete = (round, matches) => (
    round.matches.filter((match) => (!(
        Number.isInteger(matches[match].score1)
        && Number.isInteger(matches[match].score2)
        && (
            matches[match].score1 !== matches[match].score2
            || matches[match].throughOnPenalties
        )
    ))).length === 0
);

const getRounds = (rounds, matches, readOnly) => {
    const dispatch = useDispatch();
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
                                readOnly={readOnly || isRoundFinished(rounds, i)}
                            />
                        ))}
                    </div>
                    {!readOnly && !isRoundFinished(rounds, i) &&
                        <div className="col-sm-12">
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-lg d-block m-auto"
                                disabled={!roundComplete(round, matches)}
                                onClick={() => {
                                    dispatch(round.matches.length === 1
                                        ? finishTournament()
                                        : finishKnockoutRound())
                                }
                                }
                            >
                                {`Finish ${round.matches.length === 1 ? 'tournament' : 'round'}`}
                            </button>
                        </div>
                    }
                </div>
            </div>
        );
    });
};

function KnockoutStage() {
    const tournament = useSelector((state) => (getActiveTournament(state)));
    const readOnly = tournament.stage !== stages.knockoutStage;
    const rounds = getRounds(tournament.knockoutRounds, tournament.matches, readOnly);
    return (
        <div className="KnockoutStage">
            <Bracket
                matches={tournament.matches}
                players={tournament.players}
                rounds={tournament.knockoutRounds}
            />

            <div className="col-sm-12 col-md-10 offset-md-1">
                {rounds}
            </div>
        </div>
    );
}

export default KnockoutStage;
