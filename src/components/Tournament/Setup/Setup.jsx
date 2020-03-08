import React, { useState } from "react";
import AddPlayerForm from "./AddPlayerForm/AddPlayerForm";
import PlayerList from "./PlayerList/PlayerList";

function Setup() {
    const [players, setPlayers] = useState([]);
    const addPlayer = (player) => setPlayers([...players, player]);
    const deletePlayer = (player) => {
        const newPlayers = players;
        const index = newPlayers.indexOf(player);
        if (index !== -1) {
            newPlayers.splice(index, 1);
        }
        setPlayers([...newPlayers]);
    };

    return (
        <div className="Setup">
            <AddPlayerForm players={players} maxPlayersReached={players.length >= 16} addPlayerCallback={addPlayer} />
            <PlayerList players={players} deletePlayer={deletePlayer} />
        </div>
    );
}

export default Setup;
