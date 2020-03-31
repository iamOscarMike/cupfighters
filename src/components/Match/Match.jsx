import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { updateMatch } from "../../redux/actions";
import { getPlayer, getMatch } from "../../redux/selectors";
import Icon from '@mdi/react';
import { mdiSoccer } from '@mdi/js';
import './Match.scss'

function Match({
    allowPenalties,
    matchId,
    matchIndicator,
    readOnly,
}) {
    const match = useSelector((state) => (getMatch(state, matchId)));
    const player1 = useSelector((state) => (getPlayer(state, match.player1)));
    const player2 = useSelector((state) => (getPlayer(state, match.player2)));
    const hasPenalties = allowPenalties
        && Number.isInteger(match.score1)
        && Number.isInteger(match.score2)
        && match.score1 === match.score2;

    const [score1, setScore1] = useState(match.score1);
    const [score2, setScore2] = useState(match.score2);

    const dispatch = useDispatch();
    const changeScore1 = (event) => {
        if (!readOnly) {
            setScore1(event.target.value);
            dispatch(updateMatch(matchId, event.target.value, score2));
        }
    };
    const changeScore2 = (event) => {
        if (!readOnly) {
            setScore2(event.target.value);
            dispatch(updateMatch(matchId, score1, event.target.value));
        }
    };
    const changeThroughOnPenalty = (player) => {
        if (!readOnly) {
            dispatch(updateMatch(matchId, score1, score2, player));
        }
    };

    const getPenaltyClass = (player) => {
        if (match.throughOnPenalties) {
            return match.throughOnPenalties === player ? ' winner' : ' loser';
        }
        return '';
    }

    return (
        <div className="Match col-sm-12 col-md-6">
            <div className="p-4 m-3 background-dark">
                <div className="match-indicator text-center">{matchIndicator}</div>
                <div className="row score-container">
                    <div className="col-sm-6 form-inline container-player1">
                        <div className="label-container">
                            <label htmlFor={`${matchId}-player1`}>{player1}</label>
                        </div>

                        {hasPenalties &&
                            <button
                                className={'button-penalty' + getPenaltyClass(match.player1)}
                                onClick={() => { changeThroughOnPenalty(match.player1) }}
                                disabled={readOnly}
                            >
                                <Icon path={mdiSoccer} size={1} color="#29335c" />
                            </button>
                        }

                        <input
                            className="form-control ml-auto text-center"
                            id={`${matchId}-player1`}
                            type="number"
                            min="0"
                            max="99"
                            value={score1 !== null ? score1 : ''}
                            onChange={changeScore1}
                            disabled={readOnly}
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
                            disabled={readOnly}
                        />

                        {hasPenalties &&
                            <button
                                className={'button-penalty' + getPenaltyClass(match.player2)}
                                onClick={() => { changeThroughOnPenalty(match.player2) }}
                                disabled={readOnly}
                            >
                                <Icon path={mdiSoccer} size={1} color="#29335c" />
                            </button>
                        }

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
    allowPenalties: PropTypes.bool,
    matchId: PropTypes.string.isRequired,
    matchIndicator: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
};

Match.defaultProps = {
    allowPenalties: false,
    readOnly: false,
};

export default Match;
