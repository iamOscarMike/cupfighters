import React from "react";
import { hot } from "react-hot-loader";
import './App.scss';

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
            </div>
        );
    }
}

export default hot(module)(App);