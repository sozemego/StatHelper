import React from 'react';
import {SpinnerComponent} from '../../common/component/SpinnerComponent';
import SelectableElementCollectionComponent from '../../common/component/SelectableElementCollectionComponent';
import {Paper} from 'material-ui';
import {NOMINAL, ORDINAL, RATIO} from '../../scales/model/scale-constants';
import {NominalScaleDescriptivesComponent} from './NominalScaleDescriptivesComponent';
import {OrdinalScaleDescriptivesComponent} from './OrdinalScaleDescriptivesComponent';
import {RatioScaleDescriptivesComponent} from './RatioScaleDescriptivesComponent';

const resultComponentMap = {
  [NOMINAL]: NominalScaleDescriptivesComponent,
  [ORDINAL]: OrdinalScaleDescriptivesComponent,
  [RATIO]: RatioScaleDescriptivesComponent
};

const descriptiveLabelStyle = {
  display: 'flex',
  margin: '10px 0px 0px 40px'
};

const descriptiveNameStyle = {
  width: '15%',
  backgroundColor: '#BDBDBD',
  textAlign: 'center',
  fontSize: '1.25rem',
  paddingTop: '4px'
};

const descriptiveTextContainerStyle = {
  width: '85%'
};

export class DescriptivesComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  _getDescriptivesComponent = descriptive => {
    if (descriptive.results) {
      return React.createElement(resultComponentMap[descriptive.measurementLevel], {
        descriptive
      }, null);
    } else {
      return <SpinnerComponent/>;
    }
  };

  jumpToIndex = index => {
    location.href = '#' + this.props.scales.find((scale, i) => index === i).name;
    history.replaceState(null, null, location.href);
  };

  render() {
    const {
      scales,
      descriptives
    } = this.props;

    const scaleNames = scales.map(scale => scale.name);

    const {
      jumpToIndex,
      _getDescriptivesComponent
    } = this;

    return (
      <div>
        <SelectableElementCollectionComponent selectElement={jumpToIndex}
                                              elements={scaleNames}/>
        {descriptives.map((descriptive, index) => {
          return <div id={descriptive.name} key={index}
                      style={descriptiveLabelStyle}>
            <div style={descriptiveNameStyle}>{descriptive.name}</div>
            <Paper zDepth={1} style={descriptiveTextContainerStyle}>{_getDescriptivesComponent(descriptive)}</Paper>
          </div>;
        })}
      </div>
    );
  }

}