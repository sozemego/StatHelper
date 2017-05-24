import React from "react";
import {Route, Router} from "react-router";
import {connect, Provider} from "react-redux";
import {createStore} from "redux";
import {root} from "../root/Root";
import Main from "../main/Main";
import {hashHistory} from "react-router";

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Provider store={createStore(reducer)}>
                <Router history={hashHistory}>
                    <Route path="/" component={root}/>
                    <Route path="/main" component={Main}/>
                </Router>
            </Provider>
        )
    }
}

const initialState = {
    clicks: 0
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "CLICKED": return {
            ...state, clicks: action.clicks
        }
    }
    return state;
};