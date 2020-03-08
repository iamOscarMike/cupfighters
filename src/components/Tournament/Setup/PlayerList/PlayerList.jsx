import React from "react";
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiAccountEdit, mdiTrashCan } from '@mdi/js';
import './PlayerList.scss';

function PlayerList({ players, deletePlayer }) {
    if (!players.length) {
        return null;
    }

    const pots = [[], [], [], []];
    players.forEach((player, index) => { pots[index % 4].push({ index, name: player }) });
    return (
        <div className="PlayerList row">
            <div className="col-sm-12 col-md-10 offset-md-1">
                <h3 className="text-center">Players</h3>
                <div className="row">
                    {pots.map((pot, potIndex) => (
                        <div key={potIndex} className="col-lg-3">
                            <ul className="list-unstyled">
                                {pot.map((player) =>
                                    <li key={player.name}>
                                        <span className="icon">
                                            <Icon path={mdiAccountCircle} size={1.5} color="#ffd23f" />
                                        </span>
                                        <strong>{player.name}</strong>
                                        <span className="actions float-right">
                                            <button className="btn btn-secondary btn-sm mr-1" onClick={() => { }}>
                                                <Icon path={mdiAccountEdit} size={1} color="#29335C" />
                                            </button>
                                            <button className="btn btn-secondary btn-sm" onClick={() => {deletePlayer(player.name)}}>
                                                <Icon path={mdiTrashCan} size={1} color="#29335C" />
                                            </button>
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

PlayerList.propTypes = {
    players: PropTypes.array.isRequired,
    deletePlayer: PropTypes.func.isRequired,
};

export default PlayerList;