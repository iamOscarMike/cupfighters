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

function Tournament({ tournament }) {
    const dispatch = useDispatch();

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

            {canSeeStage(stages.groupStage, tournament.stage) &&
                <div>
                    <ul className="row nav nav-tabs" id="tournamentTab" role="tablist">
                        <li className="nav-item col-4">
                            <a
                                className={'nav-link' + (stages.groupStage === tournament.stage ? ' active' : '')}
                                data-toggle="tab"
                                href="#group"
                                role="tab"
                            >
                                Groups
                    </a>
                        </li>
                        <li className="nav-item col-4">
                            <a
                                className={'nav-link' + (stages.knockoutStage === tournament.stage
                                    ? ' active'
                                    : (canSeeStage(stages.knockoutStage, tournament.stage) ? '' : ' disabled')
                                )}
                                data-toggle="tab"
                                href="#knockout"
                                role="tab"
                            >
                                Knock-out
                    </a>
                        </li>
                        <li className="nav-item col-4">
                            <a
                                className={'nav-link' + (stages.finished === tournament.stage
                                    ? ' active'
                                    : (canSeeStage(stages.finished, tournament.stage) ? '' : ' disabled')
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
                            className={'tab-pane fade' + (stages.groupStage === tournament.stage ? ' show active' : '')}
                            id="group"
                            role="tabpanel"
                        >
                            {tournament.stage === stages.groupStage && <GroupStage />}
                        </div>
                        <div
                            className={'tab-pane fade' + (stages.knockoutStage === tournament.stage ? ' show active' : '')}
                            id="knockout"
                            role="tabpanel"
                        >
                            Knock-out stage todo
                        </div>
                        <div
                            className={'tab-pane fade' + (stages.finished === tournament.stage ? ' show active' : '')}
                            id="finished"
                            role="tabpanel"
                        >
                            Finished todo
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