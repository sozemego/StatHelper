import React from "react";
import {Route, Router} from "react-router";
import {Provider} from "react-redux";
import {root} from "../Root/Root";
import Main from "../Main/Main";
import {browserHistory} from "react-router";
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
                    <Router history={browserHistory}>
                        <Route path="/" component={root}/>
                        <Route path="/main" component={Main}/>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        )
    }
}