import React from 'react';
import {
  Chip,
  FlatButton,
  RadioButton,
  RadioButtonGroup,
  TextField
} from 'material-ui';
import {ActionHelpOutline} from 'material-ui/svg-icons/index';
import ToolTipComponent from '../../common/component/ToolTipComponent';
import {MEASUREMENT_LEVELS} from '../model/scale-constants';
import scaleSelectors from '../selectors';

const configurerContainerStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: '10px 25px 0px 25px'
};

const fieldStyle = {
  display: 'flex',
  justifyContent: 'flex-start'
};

const fieldNameStyle = {
  marginRight: '10px'
};

const measurementLevelStyle = {
  display: 'flex',
  flexDirection: 'row'
};

const measurementLevelItemStyle = {
  display: 'block',
  margin: 'auto',
  paddingRight: '6px'
};

const itemsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start'
};

const itemStyleStyle = {
  margin: 'auto 0px auto 0px'
};

const iconStyleStyle = {
  margin: 'auto 0px auto 0px',
  height: '100%'
};

const itemsTooltip = 'For now, values for the items are assumed to be correctly encoded. E.g. if your ' +
  'items had answers like \'very likely\', it is assumed that you already encoded them to numerical values. ' +
  'This will be changed in future releases.';

export default class ScaleConfigurerComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  _onScaleNameChange = (event, newValue) => {
    this.props.setScaleName(newValue);
  };

  _onScaleMeasurementLevelChange = (event, newValue) => {
    this.props.setMeasurementLevel(newValue);
  };

  render() {
    const {
      scale,
      removeScale
    } = this.props;

    if (!scale) {
      return null;
    }

    const items = scaleSelectors.getScaleItems(scale);

    const {
      _onScaleNameChange,
      _onScaleMeasurementLevelChange
    } = this;

    return (
      <div style={configurerContainerStyle}>
        <div style={fieldStyle}>
          <p style={fieldNameStyle}>Scale name</p>
          <TextField
            hintText="Scale name"
            fullWidth={false}
            value={scaleSelectors.getScaleName(scale)}
            underlineShow={false}
            onChange={_onScaleNameChange}/>
        </div>
        <div style={fieldStyle}>
          <p style={fieldNameStyle}>Level of measurement</p>
          <RadioButtonGroup
            name="Measurement level"
            style={measurementLevelStyle}
            valueSelected={scaleSelectors.getScaleMeasurementLevel(scale)}
            onChange={_onScaleMeasurementLevelChange}
          >
            {MEASUREMENT_LEVELS.map((level, index) => {
              return <RadioButton
                key={index}
                label={level}
                value={level}
                style={measurementLevelItemStyle}
              />;
            })}
          </RadioButtonGroup>
        </div>
        <div style={fieldStyle}>
          <p style={fieldNameStyle}>Items</p>
          <ToolTipComponent tooltip={itemsTooltip} style={iconStyleStyle}>
            <ActionHelpOutline/>
          </ToolTipComponent>
          <div style={itemsContainerStyle}>
            {items.map((item, index) => {
              return <Chip
                style={itemStyleStyle}
                key={index}>
                {item}
              </Chip>;
            })}
          </div>
        </div>
        <div>
          <FlatButton
            label="Remove scale"
            fullWidth={true}
            onTouchTap={removeScale}
          />
        </div>
      </div>
    );
  }

}