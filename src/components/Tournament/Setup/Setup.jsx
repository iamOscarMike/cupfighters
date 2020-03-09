import React, { useState } from "react";
import AddPlayerForm from "./AddPlayerForm/AddPlayerForm";
import PlayerList from "./PlayerList/PlayerList";
import SelectPlayersInKnockout from "./SelectPlayersInKnockout/SelectPlayersInKnockout";
import SelectGroupSize from "./SelectGroupSize/SelectGroupSize";

function Setup() {
    const [players, setPlayers] = useState([]);
    const [input, setInput] = useState('');
    const [amountOfPlayersInKnockout, setAmountOfPlayersInKnockout] = useState(null);
    const [groupSize, setGroupSize] = useState(null);

    const addPlayer = (player) => setPlayers([...players, player]);
    const deletePlayer = (player) => {
        const newPlayers = players;
        const index = newPlayers.indexOf(player);
        if (index !== -1) {
            newPlayers.splice(index, 1);
        }
        setPlayers([...newPlayers]);
    };
    const updatePlayer = (player) => {
        deletePlayer(player);
        setInput(player);
    };

    return (
        <div className="Setup">
            <AddPlayerForm
                players={players}
                maxPlayersReached={players.length >= 16}
                input={input}
                setInput={setInput}
                addPlayerCallback={addPlayer}
            />
            <SelectPlayersInKnockout
                players={players}
                setAmountOfPlayersInKnockout={setAmountOfPlayersInKnockout}
            />
            <SelectGroupSize
                players={players}
                setGroupSize={setGroupSize}
            />
            <PlayerList
                players={players}
                deletePlayer={deletePlayer}
                updatePlayer={updatePlayer}
            />
        </div>
    );
}

export default Setup;
