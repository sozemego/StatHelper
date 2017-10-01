import React from 'react';
import {Chip, FlatButton, RadioButton, RadioButtonGroup, TextField} from 'material-ui';
import {TEST_TYPES} from '../model/test';

const configurerContainer = {
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	margin: '10px 25px 0px 25px'
};

const field = {
	display: 'flex',
	justifyContent: 'flex-start'
};

const fieldName = {
	marginRight: '10px'
};

const testTypeContainer = {
	display: 'flex',
	flexDirection: 'row'
};

const testTypeItem = {
	display: 'block',
	margin: 'auto',
	paddingRight: '6px'
};

const itemsContainer = {
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'flex-start'
};

const itemStyle = {
	margin: 'auto 0px auto 0px'
};

export default class TestConfigurerComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	_onTestNameChange = (event, newValue) => {
		this.props.setTestName(newValue);
	};

	_onTestTypeChange = (event, newValue) => {
		this.props.setTestType(newValue);
	};

	render() {
		if (!this.props.selectedTest) {
			return null;
		}
		const test = this.props.selectedTest;
		const {scales} = test;
		return (
			<div style={configurerContainer}>
				<div style={field}>
					<p style={fieldName}>Test name</p>
					<TextField
						hintText="Test name"
						fullWidth={false}
						value={test.name}
						underlineShow={false}
						onChange={this._onTestNameChange}/>
				</div>
				<div style={field}>
					<p style={fieldName}>Test type</p>
					<RadioButtonGroup
						name="Test type"
						style={testTypeContainer}
						valueSelected={test.type}
						onChange={this._onTestTypeChange}
					>
						{TEST_TYPES.map((type, index) => {
							return <RadioButton
								key={index}
								label={type}
								value={type}
								style={testTypeItem}
							/>;
						})}
					</RadioButtonGroup>
				</div>
				<div style={field}>
					<p style={fieldName}>Scales</p>
					<div style={itemsContainer}>
						{scales.map((scale, index) => {
							return <Chip
								style={itemStyle}
								key={index}>
								{scale}
							</Chip>;
						})}
					</div>
				</div>
				<div>
					<FlatButton
						label="Remove test"
						fullWidth={true}
						onTouchTap={this.props.removeTest}
					/>
				</div>
			</div>
		);
	}
}