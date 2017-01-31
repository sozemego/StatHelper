
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory} from "react-router";

// required components
import Home from "./components/home/home";
import App from "./components/app/app";

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component = {Home}/>
    <Route path="/app" component = {App}/>
  </Router>,
  document.getElementById("app")
)
