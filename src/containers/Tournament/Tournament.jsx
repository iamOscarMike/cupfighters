import React from "react";
import PropTypes from 'prop-types';
import './Tournament.scss';
import Icon from '@mdi/react';
import { mdiArrowLeftCircle } from '@mdi/js';
import { useDispatch } from "react-redux";
import { unsetActiveTournament } from "../../redux/actions";
import { stages, canSeeStage } from "../../types/stages";
import Setup from "../../components/Tournament/Setup/Setup";
import GroupStage from "../../components/Tournament/GroupStage/GroupStage";
import KnockoutStage from "../../components/Tournament/KnockoutStage/KnockoutStage";
import Statistics from "../../components/Tournament/Statistics/Statistics";

function Tournament({ tournament }) {
    const dispatch = useDispatch();

    const canSeeGroupStage = canSeeStage(stages.groupStage, tournament.stage);
    const isInGroupStage = stages.groupStage === tournament.stage;
    const canSeeKnockoutStage = canSeeStage(stages.knockoutStage, tournament.stage);
    const isInKnockoutStage = stages.knockoutStage === tournament.stage;
    const canSeeFinished = canSeeStage(stages.finished, tournament.stage);
    const isInFinished = stages.finished === tournament.stage;

    return (
        <div className="Tournament">
            <div className="row logo-container">
                <div className="m-auto logo-small">
                    <img className="logo float-left" src="/images/cupfighters.svg" />
                    <span className="logo-text heading text-primary">Cup Fighters</span>
                </div>
            </div>

            <div className="row header-container">
                <div className="m-auto">
                    <h1 className="text-primary">{tournament.title}</h1>
                </div>
            </div>

            <button className="btn btn-link back" onClick={() => dispatch(unsetActiveTournament())}>
                <Icon
                    path={mdiArrowLeftCircle}
                    size={2}
                    color="#85ffc7"
                />
            </button>

            {tournament.stage === stages.setup && <Setup />}

            {canSeeGroupStage &&
                <div>
                    <ul className="row nav nav-tabs" id="tournamentTab" role="tablist">
                        <li className="nav-item col-12 col-sm-4 pl-0 pr-0 text-center">
                            <a
                                className={'nav-link' + (isInGroupStage ? ' active' : '')}
                                data-toggle="tab"
                                href="#group"
                                role="tab"
                            >
                                Groups
                             </a>
                        </li>
                        <li className="nav-item col-12 col-sm-4 pl-0 pr-0 text-center">
                            <a
                                className={'nav-link' + (isInKnockoutStage
                                    ? ' active'
                                    : (canSeeKnockoutStage ? '' : ' disabled')
                                )}
                                data-toggle="tab"
                                href="#knockout"
                                role="tab"
                            >
                                Knock-out
                            </a>
                        </li>
                        <li className="nav-item col-12 col-sm-4 pl-0 pr-0 text-center">
                            <a
                                className={'nav-link' + (isInFinished
                                    ? ' active'
                                    : (canSeeFinished ? '' : ' disabled')
                                )}
                                data-toggle="tab"
                                href="#finished"
                                role="tab"
                            >
                                Statistics
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="tournamentTabContent">
                        <div
                            className={'tab-pane fade' + (isInGroupStage ? ' show active' : '')}
                            id="group"
                            role="tabpanel"
                        >
                            {canSeeGroupStage && <GroupStage />}
                        </div>
                        <div
                            className={'tab-pane fade' + (isInKnockoutStage ? ' show active' : '')}
                            id="knockout"
                            role="tabpanel"
                        >
                            {canSeeKnockoutStage && <KnockoutStage />}
                        </div>
                        <div
                            className={'tab-pane fade' + (isInFinished ? ' show active' : '')}
                            id="finished"
                            role="tabpanel"
                        >
                            {canSeeFinished && <Statistics />}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

Tournament.propTypes = {
    tournament: PropTypes.shape({
        stage: PropTypes.oneOf(Object.values(stages)).isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default Tournament;