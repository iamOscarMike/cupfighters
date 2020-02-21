import React from "react";
import './SelectTournament.scss';
import { useSelector, useDispatch } from "react-redux";
import NewTournament from "../NewTournament/NewTournament";
import { getTournamentList } from "../../redux/selectors";
import Icon from '@mdi/react';
import { mdiPlayCircle, mdiTrashCanOutline } from '@mdi/js';
import { setActiveTournament, deleteTournament } from "../../redux/actions";

function SelectTournament() {
    const tournaments = useSelector((state) => (getTournamentList(state)));
    const dispatch = useDispatch();
    return (
        <div className="SelectTournament">
            <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-12">
                    <h2 className="text-center mt-5">Tournaments</h2>

                    <ul className="list-group">
                        {
                            tournaments.map(({ tournamentId, title }) => (
                                <li className="list-group-item tournament" key={tournamentId}>
                                    {title}
                                    
                                    <button
                                        className="btn btn-secondary btn-sm float-right ml-2"
                                        onClick={() => {
                                            if(window.confirm(`Are you sure you want to delete '${title}'?`)) {
                                                dispatch(deleteTournament(tournamentId))
                                            }
                                        }}
                                    >
                                        <Icon path={mdiTrashCanOutline} size={1} color="#29335c" />
                                    </button>

                                    <button
                                        className="btn btn-primary btn-sm float-right"
                                        onClick={() => dispatch(setActiveTournament(tournamentId))}
                                    >
                                        <Icon path={mdiPlayCircle} size={1} color="#29335c" />
                                    </button>
                                </li>
                            ))
                        }
                        <NewTournament />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SelectTournament;
