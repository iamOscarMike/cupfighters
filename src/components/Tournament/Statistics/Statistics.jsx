import React, { useEffect } from "react";
import { getStats, getActiveTournament } from "../../../redux/selectors";
import { useSelector } from "react-redux";
import Icon from '@mdi/react';
import {
    mdiTrophy,
    mdiMedal,
    mdiBullseyeArrow,
    mdiHand,
    mdiSoccerField,
    mdiSoccer,
    mdiEmoticonCryOutline,
} from '@mdi/js';
import './Statistics.scss';
import confetti from "canvas-confetti";
import Match from "../../Match/Match";

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

            <div className="tournament-standings mb-5">

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

            <div className="tournament-awards mb-5">
                <div className="row golden-boot">
                    <div className="col-sm-12 col-lg-5 offset-lg-1 col-xl-4 offset-xl-2">
                        <h3 className="text-center">Golden boot</h3>

                        <table className="table group table-lg">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Games played</th>
                                    <th>Goals</th>
                                    <th>+/-</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Icon className="gold" path={mdiBullseyeArrow} />{players[stats.goldenBoot[0]]}</td>
                                    <td>{stats.playerStats[stats.goldenBoot[0]].played}</td>
                                    <td>{stats.playerStats[stats.goldenBoot[0]].goalsFor}</td>
                                    <td>{stats.playerStats[stats.goldenBoot[0]].goalDifference}</td>
                                </tr>
                                <tr>
                                    <td><Icon className="silver" path={mdiBullseyeArrow} />{players[stats.goldenBoot[1]]}</td>
                                    <td>{stats.playerStats[stats.goldenBoot[1]].played}</td>
                                    <td>{stats.playerStats[stats.goldenBoot[1]].goalsFor}</td>
                                    <td>{stats.playerStats[stats.goldenBoot[1]].goalDifference}</td>
                                </tr>
                                <tr>
                                    <td><Icon className="bronze" path={mdiBullseyeArrow} />{players[stats.goldenBoot[2]]}</td>
                                    <td>{stats.playerStats[stats.goldenBoot[2]].played}</td>
                                    <td>{stats.playerStats[stats.goldenBoot[2]].goalsFor}</td>
                                    <td>{stats.playerStats[stats.goldenBoot[2]].goalDifference}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-sm-12 col-lg-5 col-xl-4">
                        <h3 className="text-center">Golden glove</h3>

                        <table className="table group table-lg">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Clean sheets</th>
                                    <th>Goals against</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Icon className="gold" path={mdiHand} />{players[stats.goldenGlove[0]]}</td>
                                    <td>{stats.playerStats[stats.goldenGlove[0]].cleanSheets}</td>
                                    <td>{stats.playerStats[stats.goldenGlove[0]].goalsAgainst}</td>
                                </tr>
                                <tr>
                                    <td><Icon className="silver" path={mdiHand} />{players[stats.goldenGlove[1]]}</td>
                                    <td>{stats.playerStats[stats.goldenGlove[1]].cleanSheets}</td>
                                    <td>{stats.playerStats[stats.goldenGlove[1]].goalsAgainst}</td>
                                </tr>
                                <tr>
                                    <td><Icon className="bronze" path={mdiHand} />{players[stats.goldenGlove[2]]}</td>
                                    <td>{stats.playerStats[stats.goldenGlove[2]].cleanSheets}</td>
                                    <td>{stats.playerStats[stats.goldenGlove[2]].goalsAgainst}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="tournament-stats">
                <div className="row mb-3">
                    <div className="col-sm-12">
                        <h3 className="text-center">Statistics</h3>
                    </div>
                </div>
                <div className="row mb-lg-5">

                    <div className="col-12 col-sm-6 col-lg-2 offset-lg-2 tournament-stat">
                        <div className="number text-center">
                            {stats.numberOfMatches}
                        </div>
                        <div className="icon">
                            <Icon path={mdiSoccerField} />
                        </div>
                        <div className="description text-center">
                            Number&nbsp;of matches&nbsp;played
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-2 offset-lg-1 tournament-stat">
                        <div className="number text-center">
                            {stats.numberOfGoals}
                        </div>
                        <div className="icon">
                            <Icon path={mdiBullseyeArrow} />
                        </div>
                        <div className="description text-center">
                            Number&nbsp;of goals&nbsp;scored
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 offset-sm-3 col-lg-2 offset-lg-1 tournament-stat">
                        <div className="number text-center">
                            {stats.averageGoalsPerMatch}
                        </div>
                        <div className="icon">
                            <Icon path={mdiSoccer} />
                        </div>
                        <div className="description text-center">
                            Average&nbsp;goals per&nbsp;game
                        </div>
                    </div>

                </div>
                <div className="row mb-5">

                    <div className="col-12 col-sm-6 col-lg-3 offset-lg-3 tournament-stat">
                        <div className="number text-center">
                            {stats.numberOfCleanSheets}
                        </div>
                        <div className="icon">
                            <Icon path={mdiHand} />
                        </div>
                        <div className="description text-center">
                            Total Clean&nbsp;sheets
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3 tournament-stat">
                        <div className="number text-center">
                            {stats.numberOfLittleJohns}
                        </div>
                        <div className="icon">
                            <Icon path={mdiEmoticonCryOutline} />
                        </div>
                        <div className="description text-center">
                            Total&nbsp;Little&nbsp;Johns<br />(humiliating&nbsp;3&#8209;0&nbsp;victory)
                        </div>
                    </div>
                </div>
            </div>

            <div className="tournament-matches mb-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 col-xl-4 offset-xl-2">
                        <h3 className="text-center">Biggest win</h3>

                        <div className="row match-container">
                            <Match
                                matchId={stats.biggestWin}
                                allowPenalties={true}
                                readOnly={true}
                                fullWidth={true}
                            />
                        </div>
                    </div>

                    <div className="col-sm-12 col-lg-6 col-xl-4">
                        <h3 className="text-center">Highest scoring match</h3>

                        <div className="row match-container">
                            <Match
                                matchId={stats.highestScoringMatch}
                                allowPenalties={true}
                                readOnly={true}
                                fullWidth={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Statistics;