import React from 'react';
import {FrequenciesTableComponent} from './FrequenciesTableComponent';

const descriptiveContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '4px 25px 4px 25px'
};

export class NominalScaleDescriptivesComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      descriptive
    } = this.props;

    const {
      results: descriptiveResults,
      measurementLevel
    } = descriptive;

    const {
      sampleSize,
      modes,
      frequencies
    } = descriptiveResults;

    return (
      <div style={descriptiveContainerStyle}>
        <div>Measurement level: {measurementLevel}</div>
        <br/>
        <div>
          Sample size of this scale is {sampleSize} (n = {sampleSize}).
        </div>
        <div>
          This scales' mode is {modes[0]}.
        </div>
        <div>
          <FrequenciesTableComponent frequencies={frequencies}/>
        </div>
      </div>
    );
  }
}