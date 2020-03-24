import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import './Match.scss'
import { updateMatch } from "../../redux/actions";
import { getPlayer, getMatch } from "../../redux/selectors";

function Match({
    matchId,
    matchIndicator,
}) {
    const match = useSelector((state) => (getMatch(state, matchId)));
    const player1 = useSelector((state) => (getPlayer(state, match.player1)));
    const player2 = useSelector((state) => (getPlayer(state, match.player2)));

    const [score1, setScore1] = useState(match.score1);
    const [score2, setScore2] = useState(match.score2);

    const dispatch = useDispatch();
    const changeScore1 = ((event) => {
        setScore1(event.target.value);
        dispatch(updateMatch(matchId, event.target.value, score2));
    });
    const changeScore2 = ((event) => {
        setScore2(event.target.value);
        dispatch(updateMatch(matchId, score1, event.target.value));
    });

    return (
        <div className="Match col-sm-12 col-md-6">
            <div className="p-4 m-3 background-dark">
                <div className="match-indicator text-center">{matchIndicator}</div>
                <div className="row score-container">
                    <div className="col-sm-6 form-inline container-player1">
                        <div className="label-container">
                            <label htmlFor={`${matchId}-player1`}>{player1}</label>
                        </div>
                        <input
                            className="form-control ml-auto text-center"
                            id={`${matchId}-player1`}
                            type="number"
                            min="0"
                            max="99"
                            value={score1 !== null ? score1 : ''}
                            onChange={changeScore1}
                        />
                    </div>
                    <div className="col-sm-6 form-inline container-player2">
                        <input
                            className="form-control text-center"
                            id={`${matchId}-player2`}
                            type="number"
                            min="0"
                            max="99"
                            value={score2 !== null ? score2 : ''}
                            onChange={changeScore2}
                        />
                        <div className="label-container">
                            <label htmlFor={`${matchId}-player2`}>{player2}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Match.propTypes = {
    matchId: PropTypes.string.isRequired,
    matchIndicator: PropTypes.string.isRequired,
};

export default Match;
