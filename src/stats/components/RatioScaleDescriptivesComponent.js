import React from 'react';
import {FlatButton} from 'material-ui';
import {LINE_CHART} from '../../charts/constants/chart-types';

const descriptiveContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '4px 25px 4px 25px'
};

export class RatioScaleDescriptivesComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      descriptive,
      scale,
      showChart
    } = this.props;

    const {
      results: descriptiveResults,
      measurementLevel
    } = descriptive;

    const {
      results: scaleResults
    } = scale;

    const {
      sampleSize,
      mean,
      min,
      max,
      median,
      standardDeviation,
      normality
    } = descriptiveResults;

    const {
      test: normalityTest,
      pValue: normalityPValue
    } = normality;

    return (
      <div style={descriptiveContainerStyle}>
        <div>Measurement level: {measurementLevel}</div>
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
          {normalityTest} test was used to determine if results of this scale
          follow a normal distribution. Its significance level was {normalityPValue} (p
          = {normalityPValue}).
          This result shows that results {normalityPValue > 0.05 ? 'follow' : 'DO NOT follow'} a
          normal distribution.
        </div>
        <FlatButton
          label="Show chart"
          onTouchTap={() => showChart(LINE_CHART, scaleResults)}
        />
      </div>
    );
  }

}