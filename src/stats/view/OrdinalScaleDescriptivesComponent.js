import React from 'react';
import {FrequenciesTableComponent} from './FrequenciesTableComponent';

const descriptiveContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '4px 25px 4px 25px'
};

export class OrdinalScaleDescriptivesComponent extends React.Component {

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
          The median was {median}.
        </div>
        <div>
          <FrequenciesTableComponent frequencies={frequencies}/>
        </div>
      </div>
    );
  }

}