import React from 'react';
import {FrequenciesTableComponent} from './FrequenciesTableComponent';

export class NominalScaleDescriptivesComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {descriptive} = this.props;
		const {results} = descriptive;
		const {
			sampleSize,
			median,
			modes,
			frequencies
		} = results;
		const bimodalDistribution = modes.length === 2;
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
					Found {modes.length} mode{bimodalDistribution ? 's' : ''}.{'\u00a0'}
					{bimodalDistribution > 1 ? 'They were ' + modes[0] + ' and ' + modes[1] : 'It\'s equal to ' + modes[0]}
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