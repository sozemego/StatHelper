import React from 'react';
import {connect} from 'react-redux';
import {Divider, FlatButton, Paper} from 'material-ui';
import {runTests} from '../actions/stats-actions';
import {RunningTestSpinnerComponent} from './RunningTestSpinnerComponent';
import {CorrelationTestResultComponent} from './CorrelationTestResultComponent';
import {CORRELATION} from '../../experimental-design/model/test';

const resultComponentMap = {
	[CORRELATION]: CorrelationTestResultComponent
};

class StatsContainer extends React.Component {

	constructor(props) {
		super(props);
	}

	_getTestComponent = (test) => {
		if (test.results) {
			return React.createElement(resultComponentMap[test.type], {test}, null);
		} else {
			return <RunningTestSpinnerComponent/>;
		}
	};

	render() {
		return (
			<div>
				<FlatButton
					label='Run tests'
					fullWidth={true}
					style={{height: '65px'}}
					labelStyle={{fontSize: '2rem'}}
					onTouchTap={this.props.runTests}
				/>
				<Divider/>
				{this.props.runningTests.map((test, index) => {
					return <Paper zDepth={1} style={{
						display: 'flex',
						flexDirection: 'column',
						margin: '0 auto 10px auto',
						width: '80%'
					}}>
						<h2 style={{textAlign: 'center', width: '100%'}}>{test.name}</h2>
						<Divider/>
						<div key={index}>
							{this._getTestComponent(test)}
						</div>
					</Paper>
				})}
			</div>
		);
	}

}

const mapStateToProps = state => {
	const {experimentalDesign, stats} = state;
	return {
		tests: experimentalDesign.tests,
		runningTests: stats.runningTests
	};
};

const dispatchToProps = dispatch => {
	return {
		runTests: () => dispatch(runTests())
	};
};

export default connect(mapStateToProps, dispatchToProps)(StatsContainer);