import React from 'react';

export class RatioScaleDescriptivesComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {descriptive} = this.props;
    const {results} = descriptive;
    const {
      sampleSize,
      mean,
      min,
      max,
      median,
      standardDeviation,
      normality
    } = results;
    return (
      <div style={{display: 'flex', flexDirection: 'column', margin: '4px 25px 4px 25px'}}>
        <div>Measurement level: {descriptive.measurementLevel}</div>
        <br/>
        <div>
          Sample size of this scale is {sampleSize} (n = {sampleSize}).
        </div>
        <div>
          On average, your participants scored {mean} (m = {mean}).
          Maximum score they achieved was {min} and maximum was {max}.
        </div>
        <div>
          The median was {median} and standard deviation {standardDeviation} (SD
          = {standardDeviation}).
        </div>
        <div>
          {normality.test} test was used to determine if results of this scale
          follow a normal distribution. Its significance level was {normality.pValue} (p
          = {normality.pValue}).
          This result shows that results {normality.pValue > 0.05 ? 'follow' : 'DO NOT follow'} a
          normal distribution.
        </div>
      </div>
    );
  }

}