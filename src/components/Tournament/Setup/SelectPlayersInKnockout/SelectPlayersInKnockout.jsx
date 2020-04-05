import React from "react";
import PropTypes from 'prop-types';

function SelectPlayersInKnockout({ players, setamountOfPlayersInKnockout }) {
    const getOptions = () => {
        const amountsOfPlayers = ([4, 8]).filter((amount) => (amount < players.length));
        const options = amountsOfPlayers.map((amount) => (
            <option key={amount} value={amount}>{amount} players</option>
        ));
        return options.length
            ? options
            : <option value={null}>Unable to pick amount with {players.length} players</option>;
    };

    return (
        <div className="SelectPlayersInKnockout row">
            <div className="col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                <div className="form-group row">
                    <label htmlFor="knockout" className="col-sm-3 col-form-label">Amount in knock out</label>
                    <div className="col-sm-9">
                        <select id="knockout" className="form-control" onChange={(event) => { setamountOfPlayersInKnockout(event.target.value) }}>
                            <option value={null}></option>
                            {getOptions()}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

SelectPlayersInKnockout.propTypes = {
    players: PropTypes.array.isRequired,
    setamountOfPlayersInKnockout: PropTypes.func.isRequired,
};

export default SelectPlayersInKnockout;