import React from 'react';
import {connect} from 'react-redux';
import {FlatButton, Paper, Tab, Tabs} from 'material-ui';
import statsOperations from '../operations';
import {TestResultsComponent} from './TestResultsComponent';
import {DescriptivesComponent} from './DescriptivesComponent';
import scaleSelectors from '../../scales/selectors';
import chartOperations from '../../charts/operations';

const statsContainerStyle = {
  margin: '0px 0px 4px 0px'
};

const runTestsButtonStyle = {
  height: '55px'
};

const tabItemContainerStyle = {
  backgroundColor: '#212121'
};

const inkBarStyle = {
  backgroundColor: 'orange'
};

class StatsContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      tests,
      runningTests,
      descriptives,
      scales,
      runTests,
      showChart
    } = this.props;

    return (
      <div>
        <Paper zDepth={4} style={statsContainerStyle}>
          <FlatButton
            label='Run tests'
            fullWidth={true}
            style={runTestsButtonStyle}
            onTouchTap={runTests}
            hoverColor="rgba(0, 0, 0, 0)"
            disableTouchRipple={false}
          />
        </Paper>
        <Tabs tabItemContainerStyle={tabItemContainerStyle} inkBarStyle={inkBarStyle}>
          <Tab label="Test results" value={1}>
            <TestResultsComponent tests={tests} runningTests={runningTests}/>
          </Tab>
          <Tab label="Descriptives" value={2}>
            <DescriptivesComponent scales={scales} descriptives={descriptives} showChart={showChart}/>
          </Tab>
        </Tabs>
      </div>
    );
  }

}

const mapStateToProps = state => {
  const {experimentalDesign, stats} = state;
  return {
    tests: experimentalDesign.tests,
    runningTests: stats.runningTests,
    minSignificance: stats.minSignificance,
    descriptives: stats.descriptives,
    scales: scaleSelectors.getScales(scaleSelectors.scaleRootSelector(state))
  };
};

const dispatchToProps = dispatch => {
  return {
    runTests: () => dispatch(statsOperations.runTests()),
    showChart: (chartType, data) => dispatch(chartOperations.showChart(chartType, data))
  };
};

export default connect(mapStateToProps, dispatchToProps)(StatsContainer);