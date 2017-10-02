import React from 'react';
import {connect} from 'react-redux';
import {Chip, Divider, FlatButton, Paper} from 'material-ui';
import {runTests} from '../actions/stats-actions';
import {RunningTestSpinnerComponent} from './RunningTestSpinnerComponent';
import {CorrelationTestResultComponent} from './CorrelationTestResultComponent';
import {CORRELATION} from '../../experimental-design/model/test';
import SelectableElementCollectionComponent from '../../common/component/SelectableElementCollectionComponent';

const resultComponentMap = {
	[CORRELATION]: CorrelationTestResultComponent
};

class StatsContainer extends React.Component {

	constructor(props) {
		super(props);
	}

	_getTestComponent = test => {
		if (test.results) {
			return React.createElement(resultComponentMap[test.type], {
				test,
				minSignificance: this.props.minSignificance
			}, null);
		} else {
			return <RunningTestSpinnerComponent/>;
		}
	};

	jumpToIndex = index => {
		const url = location.href;
		location.href = '#' + this.props.tests.find((test, i) => index === i).name;
		history.replaceState(null, null, url);
	};

	render() {
		const {tests, runningTests} = this.props;
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
				<SelectableElementCollectionComponent selectElement={this.jumpToIndex}
													  elements={tests.map(test => test.name)}/>
				{runningTests.map((test, index) => {
					return <div id={test.name} key={index} style={{display: 'flex', margin: '10px 0px 0px 40px'}}>
						<div style={{
							width: '15%',
							backgroundColor: '#80deea',
							textAlign: 'center',
							fontSize: '1.25rem',
							paddingTop: '4px'
						}}>{test.name}</div>
						<Paper zDepth={1} style={{width: '85%'}}>{this._getTestComponent(test)}</Paper>
					</div>
				})}
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