import React from 'react';
import {Chip} from 'material-ui';

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '6px'
};

const elementStyle = {
  borderRadius: '4px',
  margin: '1px'
};

const selectedElementStyle = {
  backgroundColor: 'orange'
};

export default class SelectableElementCollectionComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  _isElementSelected = index => {
    return this.props.selectedElementIndex === index;
  };

  _getElementStyle = index => {
    return this._isElementSelected(index) ? selectedElementStyle : elementStyle;
  };

  render() {
    const {
      elements,
      selectElement
    } = this.props;
    return (
      <div style={containerStyle}>
        {elements.map((element, index) => {
          return <Chip
            onTouchTap={() => selectElement(index)}
            key={index}
            style={this._getElementStyle(index)}
          >
            {element}
          </Chip>
        })}
      </div>
    );
  }
}