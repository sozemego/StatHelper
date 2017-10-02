import React from 'react';
import {connect} from 'react-redux';
import {Chip, Divider, FlatButton, Paper} from 'material-ui';
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
			return React.createElement(resultComponentMap[test.type], {
				test,
				minSignificance: this.props.minSignificance
			}, null);
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
				<div style={{display: 'flex', margin: '10px auto 10px auto', justifyContent: 'center'}}>
					{this.props.runningTests.map((test, index) => {
						return <a key={index} style={{textDecoration: 'none', color: 'inherit'}}
								  href={'#' + test.name}>
							<Chip style={{cursor: 'pointer'}}>{test.name}</Chip>
						</a>;
					})}
				</div>
				{this.props.runningTests.map((test, index) => {
					return <div key={index} id={test.name} style={{
						display: 'flex',
						flexDirection: 'column',
						margin: '0 auto 10px auto',
						width: '70%'
					}}>
						<Paper zDepth={1}>
							<div style={{backgroundColor: '#80deea'}}>
								<h2 style={{textAlign: 'center', width: '100%', margin: '0'}}>{test.name}</h2>
							</div>
							<Divider/>
							<div>
								{this._getTestComponent(test)}
							</div>
						</Paper>
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