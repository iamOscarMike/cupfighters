import React, { useState } from "react";
import './NewTournament.scss';
import { startNewTournament } from "../../redux/actions"
import { useDispatch } from 'react-redux'

function NewTournament() {

    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const handleInputChange = (event) => setInput(event.target.value);
    const handleStartNewTournament = (event) => {
        dispatch(startNewTournament(input));
        event.preventDefault();
        setInput('');
    };

    return (
        <li className="NewTournament list-group-item heading" key="new-tournament">
            <form onSubmit={handleStartNewTournament}>
                <div className="form-group row mb-0">
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Start new tournament"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-sm-4">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Start tournament
                            </button>
                    </div>
                </div>
            </form>
        </li>
    );
}

export default NewTournament;
