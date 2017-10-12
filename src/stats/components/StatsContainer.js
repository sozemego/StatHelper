import React from 'react';
import {connect} from 'react-redux';
import {FlatButton, Paper, Tab, Tabs} from 'material-ui';
import {runTests} from '../actions/stats-actions';
import {TestResultsComponent} from './TestResultsComponent';
import {DescriptivesComponent} from './DescriptivesComponent';
import {showChart} from '../../charts/actions/actions';

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
  const {experimentalDesign, stats, scales} = state;
  return {
    tests: experimentalDesign.tests,
    runningTests: stats.runningTests,
    minSignificance: stats.minSignificance,
    descriptives: stats.descriptives,
    scales: scales.scales
  };
};

const dispatchToProps = dispatch => {
  return {
    runTests: () => dispatch(runTests()),
    showChart: (chartType, data) => dispatch(showChart(chartType, data))
  };
};

export default connect(mapStateToProps, dispatchToProps)(StatsContainer);