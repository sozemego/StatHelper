import React from 'react';

export class CorrelationTestResultComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {test} = this.props;
		return (
			<div style={{display: 'flex', flexDirection: 'column', marginLeft: '25px', marginRight: '25px'}}>
				<div>Test type: {test.type}</div>
				<br/>
				<div>Results:</div>
				{test.results.map((result, index) => {
					return <div key={index}>
						<div>You performed a {result.testName} correlation on {result.scales[0].name}{'\u00a0'}
							and {result.scales[1].name}.
						</div>
						<div>The sample size for this test was {result.scales[0].result.length}.</div>
						<div>You obtained a correlation coefficient of {result.coefficient}{'\u00a0'}
							(r = {result.coefficient}) at a {result.pValue} (p = {result.pValue}) significance level.
						</div>
						<div>This result indicates that this correlation coefficient
							is {result.pValue > 0.05 ? 'NOT' : ''} {result.pValue > 0.05 ? 'significant' :
								<b>significant</b>}.
						</div>
						<br/>
					</div>;
				})}

			</div>
		);
	}

}