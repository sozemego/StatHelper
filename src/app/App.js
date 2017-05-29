import React from "react";
import {Route, Router} from "react-router";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {root} from "../root/Root";
import Main from "../main/Main";
import {hashHistory} from "react-router";
import {store} from "../store/StoreInit";
import {MuiThemeProvider} from "material-ui";

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <MuiThemeProvider>
                <Provider store={store}>
                    <Router history={hashHistory}>
                        <Route path="/" component={root}/>
                        <Route path="/main" component={Main}/>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        )
    }
}