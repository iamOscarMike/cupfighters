import React from "react";
import './SelectTournament.scss';
import { useSelector, useDispatch } from "react-redux";
import NewTournament from "../NewTournament/NewTournament";
import { getTournamentList } from "../../redux/selectors";
import Icon from '@mdi/react';
import { mdiPlayCircle, mdiTrashCanOutline, mdiLaptopWindows } from '@mdi/js';
import { setActiveTournament, deleteTournament } from "../../redux/actions";

function SelectTournament() {
    const tournaments = useSelector((state) => (getTournamentList(state)));
    const dispatch = useDispatch();
    return (
        <div className="SelectTournament">
            <div className="row header-container">
                <div className="m-auto">
                    <img className="logo float-left" src="/images/cupfighters.svg" />
                    <h1 className="text-primary">Cup Fighters</h1>
                </div>
            </div>

            <div className="row introduction">
                <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
                    <p><span className="heading">CUP FIGHTERS</span> is your online tool to start some good-old
                    couch tournament for your popular football game of choice. Create your tournament with
                    6-16 players drawn over 2-4 groups. All that's left is for you to collect your friends,
                    put on your sickest kit and start kickin'.</p>
                    <p>Best experienced on a big screen. <Icon path={mdiLaptopWindows} size={2} color="#ffffff" /></p>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-12">
                    <h2 className="text-center mt-5">Tournaments</h2>

                    <ul className="list-group">
                        {
                            tournaments.map(({ tournamentId, title }) => (
                                <li className="list-group-item tournament" key={tournamentId}>
                                    <span className="title">{title}</span>

                                    <button
                                        className="btn btn-secondary btn-sm float-right ml-2"
                                        onClick={() => {
                                            if (window.confirm(`Are you sure you want to delete '${title}'?`)) {
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
