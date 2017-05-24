import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import {createStore} from "redux";

const initialState = {
    clicks: 0
};

const reducer = (state = initialState, action) => {
    return state;
};

const app = React.createElement(App, {store: createStore(reducer)}, null);
ReactDOM.render(app, document.getElementById("root"));