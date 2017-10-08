import React from 'react';
import {FrequenciesTableComponent} from './FrequenciesTableComponent';

export class OrdinalScaleDescriptivesComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {descriptive} = this.props;
		const {results} = descriptive;
		const {
			sampleSize,
			median,
			frequencies
		} = results;
		return (
			<div style={{display: 'flex', flexDirection: 'column', margin: '4px 25px 4px 25px'}}>
				<div>Measurement level: {descriptive.measurementLevel}</div>
				<br/>
				<div>
					Sample size of this scale is {sampleSize} (n = {sampleSize}).
				</div>
				<div>
					The median was {median}.
				</div>
				<div>
					Frequencies:
				</div>
				<div>
					<FrequenciesTableComponent frequencies={frequencies}/>
				</div>
			</div>
		);
	}

}