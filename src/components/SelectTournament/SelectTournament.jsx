import React from "react";
import { useSelector } from "react-redux";
import NewTournament from "../NewTournament/NewTournament";
import { getTournamentList } from "../../redux/selectors";

function SelectTournament() {
    const tournaments = useSelector((state) => (getTournamentList(state)));
    return (
        <div className="SelectTournament">
            <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-12">
                    <h2 className="text-center mt-5">Tournaments</h2>

                    <ul className="list-group">
                        {
                            tournaments.map(({ tournamentId, title }) => (
                                <li className="list-group-item heading tournament" key={tournamentId}>{title}</li>
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
