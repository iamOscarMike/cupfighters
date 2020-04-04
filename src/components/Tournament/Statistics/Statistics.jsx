import React, { useEffect } from "react";
import { getStats, getActiveTournament } from "../../../redux/selectors";
import { useSelector } from "react-redux";
import Icon from '@mdi/react';
import { mdiTrophy, mdiMedal } from '@mdi/js';
import './Statistics.scss';
import confetti from "canvas-confetti";

function Statistics() {
    const tournament = useSelector((state) => (getActiveTournament(state)))
    const players = tournament.players;
    const stats = useSelector((state) => (getStats(state)));

    useEffect(() => {
        const end = Date.now() + (5000);
        const colors = ['#FF6F59', '#FDCA40'];
        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: {
                    x: 0
                },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: {
                    x: 1
                },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, []);

    return (
        <div className="Statistics">

            <div className="tournament-standings">

                <div className="row text-center">
                    <div className="col-12 mb-3">
                        <h2>Tournament standings</h2>
                    </div>
                </div>
                <div className="row text-center winner">
                    <div className="col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 mb-3">
                        <div className="trophy">
                            <Icon path={mdiTrophy} />
                        </div>
                        <span className="player">
                            {players[stats.winner]}
                        </span>
                    </div>
                </div>

                <div className="row text-center">
                    <div className="col-sm-12 col-md-5 offset-md-1 col-lg-4 offset-lg-2 runnerup">
                        <div className="trophy">
                            <Icon path={mdiMedal} />
                        </div>
                        <span className="player">
                            {players[stats.runnerUp]}
                        </span>
                    </div>
                    <div className="col-sm-12 col-md-5 col-lg-4 semifinalists">
                        <div className="trophy">
                            <Icon path={mdiMedal} />
                        </div>
                        <div>
                            <span className="player">
                                {players[stats.semiFinalists[0]]}
                            </span>
                        </div>
                        <div>
                            <span className="player">
                                {players[stats.semiFinalists[1]]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="row">
                <div className="col-sm-12 col-md-10 offset-md-1 col-xl-8 offset-xl-2">
                    <div className="tournament-standings">
                        <div className="container winner">
                            <span className="icon">
                                <Icon path={mdiTrophy} />
                            </span>
                            <span className="player">
                                {players[stats.winner]}
                            </span>
                        </div>
                        <div className="container runnerup">
                            <span className="icon">
                                <Icon path={mdiMedal} />
                            </span>
                            <span className="player">
                                {players[stats.runnerUp]}
                            </span>
                        </div>
                        <div className="container semifinalists">
                            <span className="icon">
                                <Icon path={mdiMedal} />
                            </span>
                            <span className="player">
                                {players[stats.semiFinalists[0]]}
                            </span>
                        </div>
                        <div className="container semifinalists">
                            <span className="icon"></span>
                            <span className="player">
                                {players[stats.semiFinalists[1]]}
                            </span>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Statistics;