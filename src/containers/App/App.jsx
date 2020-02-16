import React from "react";
import './App.scss';
import SelectTournament from "../../components/SelectTournament/SelectTournament";

class App extends React.Component {
    render() {
        return (
            <div className="App container-fluid">
                <div className="row header-container">
                    <div className="m-auto">
                        <img className="logo float-left" src="/images/cupfighters.svg" />
                        <h1 className="text-primary">Cup Fighters</h1>
                    </div>
                </div>

                <SelectTournament />
            </div>
        );
    }
}

export default App;