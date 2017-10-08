import React from 'react';

export class RatioScaleDescriptivesComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {descriptive} = this.props;
		const {results} = descriptive;
		return (
			<div style={{display: 'flex', flexDirection: 'column', margin: '4px 25px 4px 25px'}}>
				<div>Measurement level: {descriptive.measurementLevel}</div>
				<br/>
				<div>
					Sample size of this scale is {results.sampleSize} (n = {results.sampleSize}).
				</div>
				<div>
					On average, your participants scored {results.mean} (m = {results.mean}).
					Maximum score they achieved was {results.min} and maximum was {results.max}.
				</div>
				<div>
					The median was {results.median} and standard deviation {results.standardDeviation} (SD
					= {results.standardDeviation}).
				</div>
				<div>
					{results.normality.test} test was used to determine if results of this scale
					follow a normal distribution. Its significance level was {results.normality.pValue} (p
					= {results.normality.pValue}).
					This result shows that results {results.normality.pValue > 0.05 ? 'follow' : 'DO NOT follow'} a
					normal distribution.
				</div>
			</div>
		);
	}

}