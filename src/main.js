import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";

const app = React.createElement(App, null, null);
ReactDOM.render(app, document.getElementById("root"));