import React from "react";
import PropTypes from 'prop-types';

function SelectPlayersInKnockout({ players, setAmountOfPlayersInKnockout }) {
    const getOptions = () => {
        const amountsOfPlayers = ([2, 4, 8]).filter((amount) => (amount < players.length));
        const options = amountsOfPlayers.map((amount) => (
            <option key={amount} value={amount}>{amount} players</option>
        ));
        return options.length
            ? options
            : <option value={null}>Unable to pick amount with {players.length} players</option>;
    };

    return (
        <div className="SelectPlayersInKnockout form-group row">
            <div className="col-sm-12 col-md-6 offset-md-3">
                <div className="form-group row">
                    <label htmlFor="knockOut" className="col-sm-3 col-form-label">Amount in knock out</label>
                    <div className="col-sm-9">
                        <select id="knockOut" className="form-control" onChange={(event) => { setAmountOfPlayersInKnockout(event.target.value) }}>
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
    setAmountOfPlayersInKnockout: PropTypes.func.isRequired,
};

export default SelectPlayersInKnockout;