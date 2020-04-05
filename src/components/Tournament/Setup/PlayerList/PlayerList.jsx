import React from "react";
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiAccountEdit, mdiTrashCan } from '@mdi/js';
import './PlayerList.scss';

function PlayerList({ players, deletePlayer, updatePlayer }) {
    if (!players.length) {
        return null;
    }

    return (
        <div className="PlayerList row">
            <div className="col-sm-12">
                <h3 className="text-center">Players</h3>
                <div className="row">
                    <div className="col-sm-12 col-md-10 offset-md-1">
                        <ul className="list-unstyled row">
                            {players.map((player) =>
                                <li key={player} className="col-sm-12 col-lg-6 col-xl-4">
                                    <span className="icon">
                                        <Icon path={mdiAccountCircle} size={1.5} color="#ffd23f" />
                                    </span>
                                    <strong>{player}</strong>
                                    <span className="actions float-right">
                                        <button className="btn btn-secondary btn-sm mr-1" onClick={() => { updatePlayer(player) }}>
                                            <Icon path={mdiAccountEdit} size={1} color="#29335C" />
                                        </button>
                                        <button className="btn btn-secondary btn-sm" onClick={() => { deletePlayer(player) }}>
                                            <Icon path={mdiTrashCan} size={1} color="#29335C" />
                                        </button>
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>
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