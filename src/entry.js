import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

const app = React.createElement(App, null, null);
ReactDOM.render(app, document.getElementById("root"));