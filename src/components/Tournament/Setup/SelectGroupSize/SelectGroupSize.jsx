import React from "react";

function SelectGroupSize({ players, setGroupSize }) {

    const getOptions = () => {
        const groupSizes = ([...Array(players.length).keys()]).filter((playerIndex) => (
            players.length % playerIndex === 0 && playerIndex !== 1 && playerIndex !== 2
        ));
        const options = groupSizes.map(groupSize => (
            <option key={groupSize} value={groupSize}>
                {groupSize} players per group, {players.length / groupSize} groups
            </option>
        ));
        return options.length
            ? options
            : <option value="">Unable to pick group size with {players.length} players</option>;
    }

    return (
        <div className="SelectGroupSize row">
            <div className="col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                <div className="form-group row">
                    <label htmlFor="groupSize" className="col-sm-3 col-form-label">Group size</label>
                    <div className="col-sm-9">
                        <select id="groupSize" className="form-control" onChange={(event) => { setGroupSize(event.target.value) }}>
                            <option value=""></option>
                            {getOptions()}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectGroupSize;