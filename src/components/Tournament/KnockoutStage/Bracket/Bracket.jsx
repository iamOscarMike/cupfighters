import React from "react";
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiSoccer } from '@mdi/js';
import './Bracket.scss';

const roundTitles = {
    0: 'Final',
    1: 'Semi-finals',
    2: 'Quarter-finals',
};

const getMatch = (key, match, players, isFinal) => {

    const player = (containerClassName, player, score, throughOnPenalties) => (
        <div className={containerClassName}>
            <span className="player">{player}</span>
            <input className="form-control" value={score} disabled readOnly />
            {throughOnPenalties && <div className="penalties">
                <Icon path={mdiSoccer} size={1} color="#29335c" />
            </div>}
        </div>
    );

    const player1 = player(
        isFinal ? 'col-6 player-1' : 'mt-3 mb-3 p-3 background-dark',
        players[match.player1] || '',
        Number.isInteger(match.score1) ? match.score1 : '',
        match.throughOnPenalties && match.throughOnPenalties === match.player1
    );

    const player2 = player(
        isFinal ? 'col-6 player-2' : 'mt-3 mb-3 p-3 background-dark',
        players[match.player2] || '',
        Number.isInteger(match.score2) ? match.score2 : '',
        match.throughOnPenalties && match.throughOnPenalties === match.player2
    );

    return (<div key={key} className="match">
        <div className={isFinal ? "row mt-3 mb-3 p-3 background-dark" : ''}>
            {player1}
            {player2}
        </div>
    </div>);
};

const getColumns = (matches, players, rounds) => {
    const amountOfColumns = 1 + (2 * Math.log2(rounds[0].matches.length));
    const matchesPerColumn = Array(amountOfColumns).fill([]);
    rounds.forEach((round, roundIndex) => {
        const columnIndexLeft = roundIndex;
        const columnIndexRight = amountOfColumns - 1 - roundIndex;
        round.matches.forEach((match, matchIndex) => {
            const columnIndex = matchIndex % 2 === 0 ? columnIndexLeft : columnIndexRight;
            matchesPerColumn[columnIndex] = [...matchesPerColumn[columnIndex], match];
        });
    });

    const columns = [];
    for (let i = 0; i < amountOfColumns; i++) {
        const roundsUntilFinal = Math.abs(Math.floor(amountOfColumns / 2) - i);
        const playersInCurrentRound = roundsUntilFinal === 0 ? 2 : (2 + (2 * Math.log2(roundsUntilFinal))) * 2;
        const matchesInCurrentColumn = roundsUntilFinal === 0 ? 1 : (1 + (Math.log2(roundsUntilFinal)));
        let className = `col-${(roundsUntilFinal === 0 ? '4' : 2)} round-of-${playersInCurrentRound}`;
        if (roundsUntilFinal !== 0) {
            className += (i < amountOfColumns / 2 ? ' left' : ' right');
        }
        if (i === 0) {
            const offset = 5 - amountOfColumns;
            if (offset !== 0) {
                className += ` offset-${offset}`;
            }
        }

        const matchElements = [];
        for (let j = 0; j < matchesInCurrentColumn; j++) {
            matchElements.push(getMatch(`${i}-${j}`, matches[matchesPerColumn[i][j]] || {}, players, roundsUntilFinal === 0));
        }

        columns.push(
            <div key={i} className={className}>
                <p className="round-title">{roundTitles[roundsUntilFinal]}</p>
                {matchElements}
            </div>
        )
    }
    return columns;
};

function Bracket({ matches, players, rounds }) {
    return (
        <div className="Bracket">
            <div className="row">
                {getColumns(matches, players, rounds)}
            </div>
        </div>
    );
}

Bracket.propTypes = {
    matches: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired,
    rounds: PropTypes.arrayOf(PropTypes.shape({
        matches: PropTypes.arrayOf(PropTypes.string).isRequired,
    })).isRequired,
};

export default Bracket;
