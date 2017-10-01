import React from 'react';
import {connect} from 'react-redux';
import {Divider, FlatButton} from 'material-ui';
import {runTests} from '../actions/stats-actions';
import {RunningTestSpinnerComponent} from './RunningTestSpinnerComponent';

const container = {
	display: 'flex'
};

const verticalListContainer = {
	width: '30%'
};

const designContainer = {
	width: '70%'
};

const button = {
	margin: 'auto',
	width: '100%'
};

class StatsContainer extends React.Component {

	constructor(props) {
		super(props);
	}

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
					if (test.result) {

					} else {
						return <RunningTestSpinnerComponent name={test.name} key={index}/>;
					}
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