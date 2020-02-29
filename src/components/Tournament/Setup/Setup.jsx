import React, { useState } from "react";
import AddPlayerForm from "./AddPlayerForm/AddPlayerForm";
import PlayerList from "./PlayerList/PlayerList";

function Setup() {
    const [players, setPlayers] = useState([]);
    const addPlayer = (player) => setPlayers([...players, player]);

    return (
        <div className="Setup">
            <AddPlayerForm players={players} maxPlayersReached={players.length >= 16} addPlayerCallback={addPlayer} />
            <PlayerList players={players} />
        </div>
    );
}

export default Setup;
