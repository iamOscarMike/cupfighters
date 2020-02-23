import React from "react";
import PropTypes from 'prop-types';
import './Tournament.scss';
import Icon from '@mdi/react';
import { mdiArrowLeftCircle } from '@mdi/js';
import { useDispatch } from "react-redux";
import { unsetActiveTournament } from "../../redux/actions";
import { stages } from "../../types/stages";
import Setup from "../../components/Tournament/Setup/Setup";

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