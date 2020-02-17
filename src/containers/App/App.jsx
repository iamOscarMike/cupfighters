import React from "react";
import './App.scss';
import { useSelector } from "react-redux";
import SelectTournament from "../../components/SelectTournament/SelectTournament";
import { getActiveTournament } from "../../redux/selectors";

function App() {
    const tournament = useSelector((state) => (getActiveTournament(state)));
    return (
        <div className="App container-fluid">
            <div className="row header-container">
                <div className="m-auto">
                    <img className="logo float-left" src="/images/cupfighters.svg" />
                    <h1 className="text-primary">Cup Fighters</h1>
                </div>
            </div>

            {
                tournament
                    ? <h2>{tournament.title}</h2>
                    : <SelectTournament />
            }
        </div>
    );
};

export default App;