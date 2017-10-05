import React from 'react';
import {connect} from 'react-redux';
import {Chip, Divider, FlatButton, Paper, Tab, Tabs} from 'material-ui';
import {runTests} from '../actions/stats-actions';
import {RunningTestSpinnerComponent} from './RunningTestSpinnerComponent';
import {CorrelationTestResultComponent} from './CorrelationTestResultComponent';
import {CORRELATION} from '../../experimental-design/model/test';
import SelectableElementCollectionComponent from '../../common/component/SelectableElementCollectionComponent';
import {TestResultsComponent} from './TestResultsComponent';
import {DescriptivesComponent} from './DescriptivesComponent';

class StatsContainer extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {tests, runningTests} = this.props;
		return (
			<div>
				<FlatButton
					label='Run tests'
					fullWidth={true}
					style={{height: '55px'}}
					labelStyle={{fontSize: '2rem'}}
					onTouchTap={this.props.runTests}
				/>
				<Tabs tabItemContainerStyle={{backgroundColor: '#424242'}}>
					<Tab label="Test results" value={1}>
						<TestResultsComponent tests={tests} runningTests={runningTests}/>
					</Tab>
					<Tab label="Descriptives" value={2}>
						<DescriptivesComponent/>
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
		minSignificance: stats.minSignificance
	};
};

const dispatchToProps = dispatch => {
	return {
		runTests: () => dispatch(runTests())
	};
};

export default connect(mapStateToProps, dispatchToProps)(StatsContainer);