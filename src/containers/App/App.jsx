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
            <div className="row">
                <div className="col-12 text-center">
                    <p className="copyright">&copy; {(new Date()).getFullYear()} Thomas Kamermans</p>
                </div>
            </div>
        </div>
    );
};

export default App;