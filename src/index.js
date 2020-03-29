import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/js/dist/tab';

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'

import App from "./containers/App/App.jsx";
import './styles/styles.scss';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);