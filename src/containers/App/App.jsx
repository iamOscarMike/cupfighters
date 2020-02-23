import React from "react";
import './App.scss';
import { useSelector } from "react-redux";
import SelectTournament from "../../components/SelectTournament/SelectTournament";
import Tournament from '../Tournament/Tournament';
import { getActiveTournament } from "../../redux/selectors";

function App() {
    const tournament = useSelector((state) => (getActiveTournament(state)));
    return (
        <div className="App container-fluid">
            {
                tournament
                    ? <Tournament tournament={tournament} />
                    : <SelectTournament />
            }
        </div>
    );
};

export default App;