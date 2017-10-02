import React from 'react';

export class TestResultComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {test} = this.props;
		console.log(test);
		return (
			<div style={{display: 'flex', flexDirection: 'column', marginLeft: '25px', marginRight: '25px'}}>
				<div>Test type: {test.type}</div>
				<br/>
				<div>Results</div>


			</div>
		);
	}

}