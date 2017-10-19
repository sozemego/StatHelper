import React from 'react';
import {Chip, FlatButton, RadioButton, RadioButtonGroup, TextField} from 'material-ui';
import {TEST_TYPES} from '../model/test-constants';
import selectors from '../selectors';
import scaleSelectors from '../../scales/selectors';

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

const testTypeContainerStyle = {
  display: 'flex',
  flexDirection: 'row'
};

const testTypeItemStyle = {
  display: 'block',
  margin: 'auto',
  paddingRight: '6px'
};

const itemsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start'
};

const itemStyle = {
  margin: 'auto 0px auto 0px'
};

export default class TestConfigurerComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  _onTestNameChange = (event, newValue) => {
    this.props.setTestName(newValue);
  };

  _onTestTypeChange = (event, newValue) => {
    this.props.setTestType(newValue);
  };

  render() {
    if (!this.props.selectedTest) {
      return null;
    }
    const {
      selectedTest,
      removeTest
    } = this.props;

    const {
      _onTestNameChange,
      _onTestTypeChange
    } = this;

    const scales = selectors.getTestScales(selectedTest);

    return (
      <div style={configurerContainerStyle}>
        <div style={fieldStyle}>
          <p style={fieldNameStyle}>Test name</p>
          <TextField
            hintText="Test name"
            fullWidth={false}
            value={selectors.getTestName(selectedTest)}
            underlineShow={false}
            onChange={_onTestNameChange}/>
        </div>
        <div style={fieldStyle}>
          <p style={fieldNameStyle}>Test type</p>
          <RadioButtonGroup
            name="Test type"
            style={testTypeContainerStyle}
            valueSelected={selectors.getTestType(selectedTest)}
            onChange={_onTestTypeChange}
          >
            {TEST_TYPES.map((type, index) => {
              return <RadioButton
                key={index}
                label={type}
                value={type}
                style={testTypeItemStyle}
              />
            })}
          </RadioButtonGroup>
        </div>
        <div style={fieldStyle}>
          <p style={fieldNameStyle}>Scales</p>
          <div style={itemsContainerStyle}>
            {scales.map((scale, index) => {
              return <Chip
                style={itemStyle}
                key={index}
              >
                {scale}
              </Chip>
            })}
          </div>
        </div>
        <div>
          <FlatButton
            label="Remove test"
            fullWidth={true}
            onTouchTap={removeTest}
          />
        </div>
      </div>
    );
  }
}