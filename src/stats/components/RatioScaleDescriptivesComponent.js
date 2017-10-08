import React from 'react';

export class RatioScaleDescriptivesComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {descriptive} = this.props;
		console.log(descriptive);
		return (
			<div>
				RATIO
			</div>
		);
	}

}