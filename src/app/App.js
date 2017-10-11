import React from 'react';
import {browserHistory, Route, Router} from 'react-router';
import {Provider} from 'react-redux';
import {root} from '../root/Root';
import Main from '../main/Main';
import {store} from '../store/store-init';
import {MuiThemeProvider} from 'material-ui';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/" component={root}/>
            <Route path="/main" component={Main}/>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}