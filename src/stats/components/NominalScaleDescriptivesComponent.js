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
      median,
      modes,
      frequencies
    } = descriptiveResults;

    const bimodalDistribution = modes.length === 2;

    return (
      <div style={descriptiveContainerStyle}>
        <div>Measurement level: {measurementLevel}</div>
        <br/>
        <div>
          Sample size of this scale is {sampleSize} (n = {sampleSize}).
        </div>
        <div>
          The median was {median}.
        </div>
        <div>
          Found {modes.length} mode{bimodalDistribution ? 's' : ''}.{'\u00a0'}
          {bimodalDistribution > 1 ? 'They were ' + modes[0] + ' and ' + modes[1] : 'It\'s equal to ' + modes[0]}.
        </div>
        <div>
          <FrequenciesTableComponent frequencies={frequencies}/>
        </div>
      </div>
    );
  }
}