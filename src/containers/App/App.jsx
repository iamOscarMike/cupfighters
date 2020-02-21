import React from "react";
import './App.scss';
import { useSelector } from "react-redux";
import SelectTournament from "../../components/SelectTournament/SelectTournament";
import { getActiveTournament } from "../../redux/selectors";
import Icon from '@mdi/react';
import { mdiArrowLeftCircle } from '@mdi/js';
import { useDispatch } from "react-redux";
import { unsetActiveTournament } from "../../redux/actions";

function App() {
    const tournament = useSelector((state) => (getActiveTournament(state)));
    const dispatch = useDispatch();
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
                && <button className="btn btn-link back" onClick={() => dispatch(unsetActiveTournament())}>
                    <Icon
                        path={mdiArrowLeftCircle}
                        size={2}
                        color="#85ffc7"
                    />
                </button>
            }

            {
                tournament
                    ? <h2>{tournament.title}</h2>
                    : <SelectTournament />
            }
        </div>
    );
};

export default App;