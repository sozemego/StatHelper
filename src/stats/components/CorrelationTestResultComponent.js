import React from 'react';

export class CorrelationTestResultComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {test, minSignificance} = this.props;
		return (
			<div style={{display: 'flex', flexDirection: 'column', margin: '4px 25px 4px 25px'}}>
				<div>Test type: {test.type}</div>
				<br/>
				<div>Results:</div>
				{test.results.map((result, index) => {
					const {
						testName,
						coefficient,
						pValue,
						scales
					} = result;
					return <div key={index}>
						<div>You performed a {testName} correlation on {scales[0].name}{'\u00a0'}
							and {scales[1].name}.
						</div>
						<div>The sample size for this test was {scales[0].result.length}.</div>
						<div>You obtained a correlation coefficient of {coefficient}{'\u00a0'}
							(r = {coefficient}) at a {pValue} (p = {pValue}) significance level.
						</div>
						<div>This result indicates that this correlation coefficient
							is {pValue > minSignificance ? 'NOT' : ''} {pValue > minSignificance ? 'significant' :
								<b>significant</b>}.
						</div>
						<br/>
					</div>;
				})}
			</div>
		);
	}

}