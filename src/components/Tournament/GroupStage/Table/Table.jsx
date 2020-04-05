import React from "react";
import { getPlayer } from "../../../../redux/selectors";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

function Table({ stats, playersThrough, playersBestThird }) {

    const getClassNameForPlayer = (player) => {
        if (playersThrough.includes(player)) {
            return 'proceed'
        }
        if (playersBestThird.includes(player)) {
            return 'best-third';
        }
        return null;
    };

    return (
        <table className="table table-sm group">
            <thead>
                <tr>
                    <th scope="col">Player</th>
                    <th scope="col" className="text-right">P</th>
                    <th scope="col" className="text-right">W</th>
                    <th scope="col" className="text-right">D</th>
                    <th scope="col" className="text-right">L</th>
                    <th scope="col" className="text-right d-none d-sm-table-cell">GF</th>
                    <th scope="col" className="text-right d-none d-sm-table-cell">GA</th>
                    <th scope="col" className="text-right">GD</th>
                    <th scope="col" className="text-right">Points</th>
                </tr>
            </thead>
            <tbody>
                {stats.map((player) => (
                    <tr key={player.player}>
                        <td key={`${player.player}-player`} className={getClassNameForPlayer(player.player)}>
                            {useSelector((state) => (getPlayer(state, player.player)))}
                        </td>
                        <td key={`${player.player}-played`} className="text-right">{player.played}</td>
                        <td key={`${player.player}-won`} className="text-right">{player.won}</td>
                        <td key={`${player.player}-draw`} className="text-right">{player.draw}</td>
                        <td key={`${player.player}-lost`} className="text-right">{player.lost}</td>
                        <td key={`${player.player}-goalsFor`} className="text-right d-none d-sm-table-cell">{player.goalsFor}</td>
                        <td key={`${player.player}-goalsAgainst`} className="text-right d-none d-sm-table-cell">{player.goalsAgainst}</td>
                        <td key={`${player.player}-goalDifference`} className="text-right">{player.goalDifference}</td>
                        <td key={`${player.player}-points`} className="text-right">{player.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    stats: PropTypes.array.isRequired,
    playersThrough: PropTypes.array.isRequired,
    playersBestThird: PropTypes.array.isRequired,
};

export default Table;
