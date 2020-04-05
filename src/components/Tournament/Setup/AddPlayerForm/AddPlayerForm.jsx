import React, { useState } from "react";
import PropTypes from 'prop-types';

function AddPlayerForm({ players, maxPlayersReached, addPlayerCallback, input, setInput }) {
    const [invalidFeedback, setInvalidFeedback] = useState('');

    const changeInput = (event) => {
        setInput(event.target.value);
        setInvalidFeedback('')
    };
    const validateInput = () => {
        if (!input) {
            setInvalidFeedback('Player cannot be empty');
            return false;
        } else if (players.map(player => player.toLowerCase()).includes(input.toLowerCase()) === true) {
            setInvalidFeedback(`${input} was already added`);
            return false;
        } else if (input.length > 15) {
            setInvalidFeedback('Length should not be longer than 15');
            return false;
        }
        return true;
    };
    const handleAddPlayer = (event) => {
        event.preventDefault();
        if (validateInput()) {
            addPlayerCallback(input);
            setInput('');
        }
    };

    return (
        <form className="AddPlayerForm" onSubmit={handleAddPlayer}>
            <div className="row">
            <div className="col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                    <div className="form-group row">
                        <label htmlFor="addPlayer" className="col-sm-3 col-form-label">Player</label>
                        <div className="col-9 col-sm-7">
                            <input
                                type="text"
                                className={'form-control' + (invalidFeedback ? ' is-invalid' : '')}
                                value={input || ''}
                                onChange={changeInput}
                                disabled={maxPlayersReached}
                                placeholder={maxPlayersReached ? 'Max players reached' : ''}
                            />
                            <div className="invalid-feedback">{invalidFeedback}</div>
                        </div>
                        <div className="col-3 col-sm-2">
                            <button
                                type="submit"
                                className="btn btn-primary float-right"
                                disabled={maxPlayersReached}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

AddPlayerForm.propTypes = {
    maxPlayersReached: PropTypes.bool.isRequired,
    players: PropTypes.array,
    input: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
}

AddPlayerForm.defaultProps = {
    players: [],
};

export default AddPlayerForm;
