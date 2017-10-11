import React from 'react';
import {SpinnerComponent} from './RunningTestSpinnerComponent';
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
    const {scales, descriptives} = this.props;
    return (
      <div>
        <SelectableElementCollectionComponent selectElement={this.jumpToIndex}
                                              elements={scales.map(scale => scale.name)}/>
        {descriptives.map((descriptive, index) => {
          return <div id={descriptive.name} key={index}
                      style={{display: 'flex', margin: '10px 0px 0px 40px'}}>
            <div style={{
              width: '15%',
              backgroundColor: '#BDBDBD',
              textAlign: 'center',
              fontSize: '1.25rem',
              paddingTop: '4px'
            }}>{descriptive.name}</div>
            <Paper zDepth={1} style={{width: '85%'}}>{this._getDescriptivesComponent(descriptive)}</Paper>
          </div>;
        })}
      </div>
    );
  }

}